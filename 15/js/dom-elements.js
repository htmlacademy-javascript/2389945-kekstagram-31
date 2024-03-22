// Определение элементов DOM для дальнейшей работы
export const pictures = document.querySelector('.pictures');
export const pictureTemplate = document.querySelector('#picture').content;
export const fragment = document.createDocumentFragment();

export const body = document.querySelector('body');
export const picture = document.querySelector('.big-picture');
export const pictureFilters = body.querySelector('.img-filters');
export const pictureImg = picture.querySelector('img');
export const pictureCaption = picture.querySelector('.social__caption');
export const pictureLikesCount = picture.querySelector('.likes-count');
export const pictureCommentsLoader = picture.querySelector('.comments-loader');
export const pictureCancel = picture.querySelector('#picture-cancel');
export const pictureComments = picture.querySelector('.social__comments');
export const pictureComment = picture.querySelector('.social__comment');
export const pictureTotalCommentsCount = picture.querySelector(
  '.social__comment-total-count'
);
export const pictureShownCommentsCount = picture.querySelector(
  '.social__comment-shown-count'
);

export const uploadForm = document.querySelector('.img-upload__form');
export const uploadInput = uploadForm.querySelector('.img-upload__input');
export const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
export const uploadPreview = uploadOverlay.querySelector(
  '.img-upload__preview'
);
export const uploadCancel = uploadOverlay.querySelector('#upload-cancel');
export const uploadHashtags = uploadForm.querySelector('.text__hashtags');
export const uploadDescription = uploadForm.querySelector('.text__description');
export const uploadSubmitButton = uploadForm.querySelector(
  '.img-upload__submit'
);

export const scaleSmaller = uploadOverlay.querySelector(
  '.scale__control--smaller'
);
export const scaleBigger = uploadOverlay.querySelector(
  '.scale__control--bigger'
);
export const scaleControl = uploadOverlay.querySelector(
  '.scale__control--value'
);

export const sliderContainer = uploadOverlay.querySelector(
  '.img-upload__effect-level'
);
export const sliderControl = uploadOverlay.querySelector(
  '.effect-level__slider'
);
export const sliderValue = uploadOverlay.querySelector('.effect-level__value');
export const effectsList = uploadOverlay.querySelector('.effects__list');
export const effectNone = effectsList.querySelector('#effect-none');

export const dataError = document.querySelector('#data-error').content;
export const dataErrorTemplate = dataError
  .querySelector('.data-error')
  .cloneNode(true);
export const dataErrorTitle =
  dataErrorTemplate.querySelector('.data-error__title');

export const dataSuccess = document.querySelector('#success').content;
export const dataSuccessTemplate = dataSuccess
  .querySelector('.success')
  .cloneNode(true);
export const dataSuccessButton =
  dataSuccessTemplate.querySelector('.success__button');
