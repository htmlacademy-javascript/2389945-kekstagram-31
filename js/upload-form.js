import {
  ScaleOptions,
  DESCRIPTION_LENGTH,
  HashtagsValidateOptions
} from './config.js';

import {
  effectNoneElement,
  scaleBiggerElement,
  scaleControlElement,
  scaleSmallerElement,
  uploadCancelElement,
  uploadDescriptionElement,
  uploadFormElement,
  uploadHashtagsElement,
  uploadInputElement,
  uploadPreviewImgElement,
  uploadOverlayElement,
  uploadSubmitButtonElement,
  effectsPreviewsContainerElement
} from './dom-elements.js';
import {
  createSlider,
  uploadFormEffects,
} from './upload-form-effects.js';
import {
  onScaleBiggerClick,
  onScaleSmallerClick,
  scalePicture,
} from './upload-form-scale.js';

import {
  sendServerData,
  onSendError,
  onSendSuccess,
} from './server-data.js';
import {
  isArrayDuplicates,
  isEscapeKey,
  validatePattern,
  getFilePath,
} from './utils.js';

const pristine = new Pristine(
  uploadFormElement,
  {
    classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
    errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
    errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
    errorTextClass: 'img-upload__field-wrapper--error', // Класс для элемента с текстом ошибки
  },
  false
);

// Действия при публикации формы
const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadSubmitButtonElement.disabled = true;
    uploadSubmitButtonElement.textContent = 'Отправка данных на сервер';

    const formData = new FormData(evt.target);

    sendServerData(formData)
      .then(onSendSuccess)
      .catch((err) => {
        onSendError(err.message);
      })
      .finally(() => {
        uploadSubmitButtonElement.disabled = false;
        uploadSubmitButtonElement.textContent = 'Опубликовать';
      });
  }
};

// Действия при нажатии клавиши Escape
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (evt.target !== uploadHashtagsElement && evt.target !== uploadDescriptionElement) {
      closeUpload();
    }
  }
};

const onUploadCancelClick = () => closeUpload();

// Обработка формы загрузки и редактирования фото
const createUploadForm = () => {
  createSlider();
  const openUpload = () => {
    const filePath = getFilePath(uploadInputElement.files[0]);
    uploadPreviewImgElement.src = filePath;
    effectsPreviewsContainerElement.forEach((preview) => {
      preview.style.backgroundImage = `url(${filePath})`;
    });
    uploadFormElement.addEventListener('submit', onUploadFormSubmit);
    uploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    uploadCancelElement.addEventListener('click', onUploadCancelClick);
    scaleSmallerElement.addEventListener('click', onScaleSmallerClick);
    scaleBiggerElement.addEventListener('click', onScaleBiggerClick);
    uploadFormEffects();
  };

  // Сообщение об ошибке при валидации хэштега
  const getHashtagErrorMessage = (value) => {
    const hashtags = value
      .trim()
      .toLowerCase()
      .replace(/ +/g, ' ')
      .split(HashtagsValidateOptions.SPLITTER);
    if (value === '') {
      return null;
    } else if (!validatePattern(hashtags)) {
      return 'Введён невалидный хэштег';
    } else if (isArrayDuplicates(hashtags)) {
      return 'Хэштеги повторяются';
    } else if (hashtags.length > HashtagsValidateOptions.MAX_COUNT) {
      return 'Превышено количество хэштегов';
    } else {
      return null;
    }
  };

  // Валидация хэштега
  const validateHashtag = (value) => !getHashtagErrorMessage(value) === true;

  // Валидация комментария
  const validateDescription = (value) =>
    value.length <= DESCRIPTION_LENGTH || value === '';

  // Сообщение об ошибке при валидации комментария
  const getDescriptionErrorMessage = () =>
    `Комментарий должен содержать не более ${DESCRIPTION_LENGTH} символов`;

  // Валидатор для хэштегов
  pristine.addValidator(
    uploadHashtagsElement,
    validateHashtag,
    getHashtagErrorMessage
  );

  // Валидатор для комментариев
  pristine.addValidator(
    uploadDescriptionElement,
    validateDescription,
    getDescriptionErrorMessage
  );

  // Обработка события изменения поля с файлом для загрузки
  uploadInputElement.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUpload();
  });
};

// Закрытие формы загрузки и редактирования фото
function closeUpload() {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInputElement.value = null;
  uploadHashtagsElement.value = null;
  uploadDescriptionElement.value = null;
  scaleControlElement.value = ScaleOptions.DEFAULT_VALUE;
  effectNoneElement.checked = true;
  scalePicture(null);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelElement.removeEventListener('click', onUploadCancelClick);
  scaleSmallerElement.removeEventListener('click', onScaleSmallerClick);
  scaleBiggerElement.removeEventListener('click', onScaleBiggerClick);
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);
  pristine.reset();
}

export { closeUpload, createUploadForm, onDocumentKeydown };
