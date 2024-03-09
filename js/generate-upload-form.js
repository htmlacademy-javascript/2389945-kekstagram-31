import {
  MAX_HASHTAGS_COUNT,
  DESCRIPTION_LENGTH,
  HASHTAGS_SPLITTER,
  MIN_HASHTAG_LENGTH,
  MAX_HASHTAG_LENGTH,
} from './config.js';

import {
  body,
  uploadInput,
  uploadOverlay,
  uploadCancel,
  uploadForm,
  uploadHashtags,
  uploadDescription,
} from './shared.js';

import { isEscapeKey, arrayHasDuplicates, validatePattern } from './utils.js';

const processUpload = () => {
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

  const validateHashtag = (value) => {
    const hashtags = value.trim().split(HASHTAGS_SPLITTER);
    return (
      (validatePattern(hashtags) &&
        !arrayHasDuplicates(hashtags) &&
        hashtags.length <= MAX_HASHTAGS_COUNT) ||
      value === ''
    );
  };

  const getHashtagErrorMessage =
    () => `хэштег должен начинаться с символа # <br>
    хэштег должен содержать хотя бы ${MIN_HASHTAG_LENGTH} символа <br>
    хэштег может содержать максимум ${MAX_HASHTAG_LENGTH} символов <br>
    количество хэштегов не более ${MAX_HASHTAGS_COUNT}`;

  const validateDescription = (value) =>
    value.length <= DESCRIPTION_LENGTH || value === '';

  const getDescriptionErrorMessage = () =>
    `Комментарий должен содержать не более ${DESCRIPTION_LENGTH} символов`;

  pristine.addValidator(
    uploadHashtags,
    validateHashtag,
    getHashtagErrorMessage
  );
  pristine.addValidator(
    uploadDescription,
    validateDescription,
    getDescriptionErrorMessage
  );

  // Действия при нажатии клавиши Escape
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (evt.target !== uploadHashtags && evt.target !== uploadDescription) {
        closeUpload();
      }
    }
  };

  const openUpload = () => {
    uploadForm.addEventListener('submit', (evt) => {
      //console.log(pristine.getErrors(uploadForm));
      if (!pristine.validate()) {
        evt.preventDefault();
      }
    });

    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  };

  uploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUpload();
  });

  uploadCancel.addEventListener('click', () => {
    closeUpload();
  });

  function closeUpload() {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadInput.value = null;
    uploadHashtags.value = null;
    uploadDescription.value = null;
    pristine.reset();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

export { processUpload };
