import { SHOWN_COMMENTS_COUNT } from './config.js';
import { isEnterKey, isEscapeKey } from './utils.js';

import {
  pictureElement,
  pictureCancelElement,
  pictureCaptionElement,
  pictureCommentElement,
  pictureCommentsContainerElement,
  pictureCommentsLoaderElement,
  pictureImgElement,
  pictureLikesCountElement,
  pictureShownCommentsCountElement,
  pictureTotalCommentsCountElement,
} from './dom-elements.js';

import {
  clearPictureState,
  getCommentsFromCurrentPicture,
  getCurrentOpenedComments,
  getCurrentTotalComments,
  getPictureById,
  setCurrentOpenedComments,
  setCurrentOpenedPicture,
} from './picture-state.js';

// Добавление блока с комментариями
const addComments = (comments, commentsCount) => {
  const fromCommentsCount = commentsCount - SHOWN_COMMENTS_COUNT;
  let toCommentsCount;
  if (commentsCount < comments.length) {
    toCommentsCount = commentsCount;
    pictureCommentsLoaderElement.classList.remove('hidden');
  } else {
    toCommentsCount = comments.length;
    pictureCommentsLoaderElement.classList.add('hidden');
  }
  for (let i = fromCommentsCount; i < toCommentsCount; i++) {
    const newComment = pictureCommentElement.cloneNode(true);
    const newCommentImg = newComment.querySelector('img');
    newCommentImg.src = comments[i].avatar;
    newCommentImg.alt = comments[i].name;
    newComment.querySelector('.social__text').textContent = comments[i].message;
    pictureCommentsContainerElement.appendChild(newComment);
  }
  pictureShownCommentsCountElement.textContent = toCommentsCount;
  setCurrentOpenedComments(getCurrentOpenedComments() + SHOWN_COMMENTS_COUNT);
};

// Действия при нажатии клавиши Escape
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

// Действия при клике на кнопке "Загрузить еще"
const onPictureCommentsLoaderClick = () => {
  if (
    getCurrentOpenedComments() <
    getCommentsFromCurrentPicture().length + SHOWN_COMMENTS_COUNT
  ) {
    addComments(getCommentsFromCurrentPicture(), getCurrentOpenedComments());
  } else {
    pictureCommentsLoaderElement.classList.add('hidden');
  }
};

// Обработчик клика по элементу закрытия формы
const onPictureCancelClick = () => closePicture();

// Открытие формы полноразмерного просмотра фото
const openPicture = (pictureId) => {
  const newPicture = getPictureById(Number(pictureId));
  setCurrentOpenedPicture(Number(pictureId));
  pictureImgElement.src = newPicture.url;
  pictureCaptionElement.textContent = newPicture.description;
  pictureLikesCountElement.textContent = newPicture.likes;
  pictureTotalCommentsCountElement.textContent = getCurrentTotalComments();
  document.body.classList.add('modal-open');
  pictureElement.classList.remove('hidden');
  pictureCommentsContainerElement.replaceChildren();
  setCurrentOpenedComments(SHOWN_COMMENTS_COUNT);
  addComments(getCommentsFromCurrentPicture(), getCurrentOpenedComments());
  document.addEventListener('keydown', onDocumentKeydown);
  pictureCommentsLoaderElement.addEventListener(
    'click',
    onPictureCommentsLoaderClick
  );
  pictureCancelElement.addEventListener('click', onPictureCancelClick);
  pictureCancelElement.addEventListener('keydown', onDocumentKeydown);
};

// Закрытие формы полноразмерного просмотра фото
function closePicture() {
  document.body.classList.remove('modal-open');
  pictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCommentsLoaderElement.removeEventListener(
    'click',
    onPictureCommentsLoaderClick
  );
  pictureCancelElement.removeEventListener('click', onPictureCancelClick);
  pictureCancelElement.removeEventListener('keydown', onDocumentKeydown);
  clearPictureState();
}

export { openPicture };
