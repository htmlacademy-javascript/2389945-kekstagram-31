import { HASHTAG_PATTERN, DESCRIPTION_LENGTH } from './config.js';
import { isEscapeKey } from './utils.js';
import {
  body,
  uploadInput,
  uploadOverlay,
  uploadCancel,
  uploadForm,
  uploadHashtags,
  uploadDescription,
} from './shared.js';

const processUpload = () => {
  // Действия при нажатии клавиши Escape
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

  const validateHashtag = (value) =>
    HASHTAG_PATTERN.test(value) || value === '';

  const validateDescription = (value) =>
    value.length <= DESCRIPTION_LENGTH || value === '';

  pristine.addValidator(uploadHashtags, validateHashtag, 'Хэштег не валидный');
  pristine.addValidator(
    uploadDescription,
    validateDescription,
    'Коммент не валидный'
  );

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (
        evt.target !== uploadHashtags &&
        evt.target !== uploadDescription
      ) {
        closeUpload();
      }
    }
  };

  const openUpload = () => {
    uploadForm.addEventListener('submit', (evt) => {
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
