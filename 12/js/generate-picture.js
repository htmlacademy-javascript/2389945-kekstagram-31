import { SHOWN_COMMENTS_COUNT } from './config.js';
import { isEnterKey, isEscapeKey } from './utils.js';

import {
  body,
  picture,
  pictureImg,
  pictureCaption,
  pictureLikesCount,
  pictureCommentsLoader,
  pictureTotalCommentsCount,
  pictureShownCommentsCount,
  pictureCancel,
  pictureComments,
  pictureComment,
} from './shared.js';

import {
  clearState,
  getCommentsFromCurrentPost,
  getCurrentOpenedComments,
  getCurrentTotalComments,
  getPostById,
  setCurrentOpenedComments,
  setCurrentOpenedPost,
} from './generate-state.js';

// Действия при нажатии клавиши Escape
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

// Добавление блока с комментариями
const addComments = (comments, commentsCount) => {
  const fromCommentsCount = commentsCount - SHOWN_COMMENTS_COUNT;
  const toCommentsCount =
    commentsCount < comments.length ? commentsCount : comments.length;
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

// Открытие формы полноразмерного просмотра фото
const openPicture = (postId) => {
  const post = getPostById(+postId);
  setCurrentOpenedPost(+postId);
  pictureImg.src = post.url;
  pictureCaption.textContent = post.description;
  pictureLikesCount.textContent = post.likes;
  pictureTotalCommentsCount.textContent = getCurrentTotalComments();
  body.classList.add('modal-open');
  picture.classList.remove('hidden');
  while (pictureComments.firstChild) {
    pictureComments.removeChild(pictureComments.firstChild);
  }
  setCurrentOpenedComments(SHOWN_COMMENTS_COUNT);
  addComments(getCommentsFromCurrentPost(), getCurrentOpenedComments());
  document.addEventListener('keydown', onDocumentKeydown);
};

// Событие клика на кнопке "Загрузить еще"
pictureCommentsLoader.addEventListener('click', () => {
  if (
    getCurrentOpenedComments() <
    getCommentsFromCurrentPost().length + SHOWN_COMMENTS_COUNT
  ) {
    addComments(getCommentsFromCurrentPost(), getCurrentOpenedComments());
  }
});

// Событие закрытия формы по клику мыши
pictureCancel.addEventListener('click', () => {
  closePicture();
});

// Событие закрытия формы по нажатию Enter на кнопке закрытия
pictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePicture();
  }
});

// Закрытие формы полноразмерного просмотра фото
function closePicture() {
  body.classList.remove('modal-open');
  picture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearState();
}

export { openPicture };
