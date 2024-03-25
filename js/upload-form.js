import {
  DEFAULT_SCALE,
  DESCRIPTION_LENGTH,
  HASHTAGS_SPLITTER,
  MAX_HASHTAGS_COUNT,
} from './config.js';

import {
  bodyElement,
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
  //destroyUploadFormSlider,
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
  arrayHasDuplicates,
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
    //uploadOverlay.classList.add('hidden');
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
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    uploadCancelElement.addEventListener('click', closeUpload);
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
      .split(HASHTAGS_SPLITTER);
    if (value === '') {
      return null;
    } else if (!validatePattern(hashtags)) {
      return 'Введён невалидный хэштег';
    } else if (arrayHasDuplicates(hashtags)) {
      return 'Хэштеги повторяются';
    } else if (hashtags.length > MAX_HASHTAGS_COUNT) {
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
  bodyElement.classList.remove('modal-open');
  uploadInputElement.value = null;
  uploadHashtagsElement.value = null;
  uploadDescriptionElement.value = null;
  scaleControlElement.value = DEFAULT_SCALE;
  effectNoneElement.checked = true;
  scalePicture(null);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelElement.removeEventListener('click', closeUpload);
  scaleSmallerElement.removeEventListener('click', onScaleSmallerClick);
  scaleBiggerElement.removeEventListener('click', onScaleBiggerClick);
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);
  pristine.reset();
}

export { closeUpload, createUploadForm, onDocumentKeydown };
