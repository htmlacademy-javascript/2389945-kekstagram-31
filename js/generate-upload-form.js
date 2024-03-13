import {
  DEFAULT_SCALE,
  DESCRIPTION_LENGTH,
  HASHTAGS_SPLITTER,
  MAX_HASHTAGS_COUNT,
  MAX_HASHTAG_LENGTH,
  MIN_HASHTAG_LENGTH,
} from './config.js';

import {
  scalePicture,
  onScaleSmallerClick,
  onScaleBiggerClick,
} from './generate-scale.js';
import { destroySlider, processSlider } from './generate-slider.js';
import {
  body,
  scaleControl,
  scaleSmaller,
  scaleBigger,
  uploadCancel,
  uploadDescription,
  uploadForm,
  uploadHashtags,
  uploadInput,
  uploadOverlay,
} from './shared.js';

import { arrayHasDuplicates, isEscapeKey, validatePattern } from './utils.js';

// Обработка формы загрузки и редактирования фото
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
    uploadForm.addEventListener('submit', (evt) => {
      if (!pristine.validate()) {
        evt.preventDefault();
      }
    });

    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    scaleSmaller.addEventListener('click', onScaleSmallerClick);
    scaleBigger.addEventListener('click', onScaleBiggerClick);
    processSlider();
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
    pristine.reset();
    destroySlider();
  }
};

export { processUpload };
