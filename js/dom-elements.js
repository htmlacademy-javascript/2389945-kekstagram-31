// Определение элементов DOM для дальнейшей работы
export const picturesContainerElement = document.querySelector('.pictures');
export const pictureTemplateElement =
  document.querySelector('#picture').content;
export const documentFragment = document.createDocumentFragment();

//export const bodyElement = document.querySelector('body');
export const pictureElement = document.querySelector('.big-picture');
export const pictureFiltersContainerElement =
  document.querySelector('.img-filters');
export const pictureImgElement = pictureElement.querySelector('img');
export const pictureCaptionElement =
  pictureElement.querySelector('.social__caption');
export const pictureLikesCountElement =
  pictureElement.querySelector('.likes-count');
export const pictureCommentsLoaderElement =
  pictureElement.querySelector('.comments-loader');
export const pictureCancelElement =
  pictureElement.querySelector('#picture-cancel');
export const pictureCommentsContainerElement =
  pictureElement.querySelector('.social__comments');
export const pictureCommentElement =
  pictureElement.querySelector('.social__comment');
export const pictureTotalCommentsCountElement = pictureElement.querySelector(
  '.social__comment-total-count'
);
export const pictureShownCommentsCountElement = pictureElement.querySelector(
  '.social__comment-shown-count'
);

export const uploadFormElement = document.querySelector('.img-upload__form');
export const uploadInputElement =
  uploadFormElement.querySelector('.img-upload__input');
export const uploadOverlayElement = uploadFormElement.querySelector(
  '.img-upload__overlay'
);
export const uploadPreviewElement = uploadOverlayElement.querySelector(
  '.img-upload__preview'
);
export const uploadPreviewImgElement =
  uploadPreviewElement.querySelector('img');
export const uploadCancelElement =
  uploadOverlayElement.querySelector('#upload-cancel');
export const uploadHashtagsElement =
  uploadFormElement.querySelector('.text__hashtags');
export const uploadDescriptionElement =
  uploadFormElement.querySelector('.text__description');
export const uploadSubmitButtonElement = uploadFormElement.querySelector(
  '.img-upload__submit'
);

export const scaleSmallerElement = uploadOverlayElement.querySelector(
  '.scale__control--smaller'
);
export const scaleBiggerElement = uploadOverlayElement.querySelector(
  '.scale__control--bigger'
);
export const scaleControlElement = uploadOverlayElement.querySelector(
  '.scale__control--value'
);

export const sliderContainerElement = uploadOverlayElement.querySelector(
  '.img-upload__effect-level'
);
export const sliderControlElement = uploadOverlayElement.querySelector(
  '.effect-level__slider'
);
export const sliderValueElement = uploadOverlayElement.querySelector(
  '.effect-level__value'
);
export const effectsListContainerElement =
  uploadOverlayElement.querySelector('.effects__list');
export const effectsPreviewsContainerElement =
  uploadOverlayElement.querySelectorAll('.effects__preview');
export const effectNoneElement =
  effectsListContainerElement.querySelector('#effect-none');

export const dataErrorElement = document.querySelector('#data-error').content;
export const dataErrorTemplateElement = dataErrorElement
  .querySelector('.data-error')
  .cloneNode(true);
export const dataErrorTitleElement =
  dataErrorTemplateElement.querySelector('.data-error__title');

export const successElement = document.querySelector('#success').content;
export const successTemplateElement = successElement
  .querySelector('.success')
  .cloneNode(true);
export const successButtonElement =
  successTemplateElement.querySelector('.success__button');

export const errorElement = document.querySelector('#error').content;
export const errorTemplateElement = errorElement
  .querySelector('.error')
  .cloneNode(true);
export const errorButtonElement =
  errorTemplateElement.querySelector('.error__button');
