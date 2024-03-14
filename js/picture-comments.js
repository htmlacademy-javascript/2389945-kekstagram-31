import { SHOWN_COMMENTS_COUNT } from './config.js';
import { isEnterKey, isEscapeKey } from './utils.js';

import {
  body,
  picture,
  pictureCancel,
  pictureCaption,
  pictureComment,
  pictureComments,
  pictureCommentsLoader,
  pictureImg,
  pictureLikesCount,
  pictureShownCommentsCount,
  pictureTotalCommentsCount,
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
    pictureCommentsLoader.classList.remove('hidden');
  } else {
    toCommentsCount = comments.length;
    pictureCommentsLoader.classList.add('hidden');
  }
  for (let i = fromCommentsCount; i < toCommentsCount; i++) {
    const newComment = pictureComment.cloneNode(true);
    const newCommentImg = newComment.querySelector('img');
    newCommentImg.src = comments[i].avatar;
    newCommentImg.alt = comments[i].name;
    newComment.querySelector('.social__text').textContent = comments[i].message;
    pictureComments.appendChild(newComment);
  }
  pictureShownCommentsCount.textContent = toCommentsCount;
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
const onPictureCommentsLoader = () => {
  if (
    getCurrentOpenedComments() <
    getCommentsFromCurrentPicture().length + SHOWN_COMMENTS_COUNT
  ) {
    addComments(getCommentsFromCurrentPicture(), getCurrentOpenedComments());
  } else {
    pictureCommentsLoader.classList.add('hidden');
  }
};

// Открытие формы полноразмерного просмотра фото
const openPicture = (pictureId) => {
  const newPicture = getPictureById(+pictureId);
  setCurrentOpenedPicture(+pictureId);
  pictureImg.src = newPicture.url;
  pictureCaption.textContent = newPicture.description;
  pictureLikesCount.textContent = newPicture.likes;
  pictureTotalCommentsCount.textContent = getCurrentTotalComments();
  body.classList.add('modal-open');
  picture.classList.remove('hidden');
  while (pictureComments.firstChild) {
    pictureComments.removeChild(pictureComments.firstChild);
  }
  setCurrentOpenedComments(SHOWN_COMMENTS_COUNT);
  addComments(getCommentsFromCurrentPicture(), getCurrentOpenedComments());
  document.addEventListener('keydown', onDocumentKeydown);
  pictureCommentsLoader.addEventListener('click', onPictureCommentsLoader);
  pictureCancel.addEventListener('click', closePicture);
  pictureCancel.addEventListener('keydown', onDocumentKeydown);
};

// Закрытие формы полноразмерного просмотра фото
function closePicture() {
  body.classList.remove('modal-open');
  picture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCommentsLoader.removeEventListener('click', onPictureCommentsLoader);
  pictureCancel.removeEventListener('click', closePicture);
  pictureCancel.removeEventListener('keydown', onDocumentKeydown);
  clearPictureState();
}

export { openPicture };
