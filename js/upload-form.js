import {
  DEFAULT_SCALE,
  DESCRIPTION_LENGTH,
  HASHTAGS_SPLITTER,
  MAX_HASHTAGS_COUNT,
  MAX_HASHTAG_LENGTH,
  MIN_HASHTAG_LENGTH,
} from './config.js';

import {
  body,
  scaleBigger,
  scaleControl,
  scaleSmaller,
  uploadCancel,
  uploadDescription,
  uploadForm,
  uploadHashtags,
  uploadInput,
  uploadOverlay,
} from './dom-elements.js';
import {
  destroyUploadFormSlider,
  uploadFormEffects,
} from './upload-form-effects.js';
import {
  onScaleBiggerClick,
  onScaleSmallerClick,
  scalePicture,
} from './upload-form-scale.js';

import { arrayHasDuplicates, isEscapeKey, validatePattern } from './utils.js';

// Обработка формы загрузки и редактирования фото
const createUploadForm = () => {
  const pristine = new Pristine(
    uploadForm,
    {
      classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
      //errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
      //successClass: 'form__item--valid', // Класс, обозначающий валидное поле
      errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
      errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
      errorTextClass: 'img-upload__field-wrapper--error', // Класс для элемента с текстом ошибки
    },
    false
  );

  const onUploadFormSubmit = (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  };

  // Действия при нажатии клавиши Escape
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (evt.target !== uploadHashtags && evt.target !== uploadDescription) {
        closeUpload();
      }
    }
  };

  // Открытие формы загрузки и редактирования фото
  const openUpload = () => {
    uploadForm.addEventListener('submit', onUploadFormSubmit);

    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    scaleSmaller.addEventListener('click', onScaleSmallerClick);
    scaleBigger.addEventListener('click', onScaleBiggerClick);
    uploadFormEffects();
  };

  // Валидация хэштега
  const validateHashtag = (value) => {
    const hashtags = value.trim().replace(/ +/g, ' ').split(HASHTAGS_SPLITTER);
    return (
      (validatePattern(hashtags) &&
        !arrayHasDuplicates(hashtags) &&
        hashtags.length <= MAX_HASHTAGS_COUNT) ||
      value === ''
    );
  };

  // Сообщение об ошибке при валидации хэштега
  const getHashtagErrorMessage =
    () => `хэштег должен начинаться с символа # <br>
    хэштег должен содержать хотя бы ${MIN_HASHTAG_LENGTH} символа <br>
    хэштег может содержать максимум ${MAX_HASHTAG_LENGTH} символов <br>
    количество хэштегов не более ${MAX_HASHTAGS_COUNT}`;

  // Валидация комментария
  const validateDescription = (value) =>
    value.length <= DESCRIPTION_LENGTH || value === '';

  // Сообщение об ошибке при валидации комментария
  const getDescriptionErrorMessage = () =>
    `Комментарий должен содержать не более ${DESCRIPTION_LENGTH} символов`;

  // Валидатор для хэштегов
  pristine.addValidator(
    uploadHashtags,
    validateHashtag,
    getHashtagErrorMessage
  );

  // Валидатор для комментариев
  pristine.addValidator(
    uploadDescription,
    validateDescription,
    getDescriptionErrorMessage
  );

  // Обработка события изменения поля с файлом для загрузки
  uploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUpload();
  });

  // Обработка события закрытия формы загрузки и редактирования фото
  uploadCancel.addEventListener('click', closeUpload);

  // Закрытие формы загрузки и редактирования фото
  function closeUpload() {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadInput.value = null;
    uploadHashtags.value = null;
    uploadDescription.value = null;
    scaleControl.value = DEFAULT_SCALE;
    scalePicture(null);
    document.removeEventListener('keydown', onDocumentKeydown);
    scaleSmaller.removeEventListener('click', onScaleSmallerClick);
    scaleBigger.removeEventListener('click', onScaleBiggerClick);
    uploadForm.removeEventListener('submit', onUploadFormSubmit);
    pristine.reset();
    destroyUploadFormSlider();
  }
};

export { createUploadForm };
