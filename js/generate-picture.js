import { SHOWN_COMMENTS_COUNT } from './config';
import { isEnterKey, isEscapeKey } from './utils';

// Определение элементов DOM для дальнейшей работы
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const actionBigPictureCommentsLoad =
  bigPicture.querySelector('.comments-loader');
const bigPictureTotalCommentsCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const bigPictureShownCommentsCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const actionBigPictureCancel = bigPicture.querySelector('#picture-cancel');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureComment = bigPicture.querySelector('.social__comment');

let shownComments = 0;
let sourcePost;

// Закрытие формы полноразмерного просмотра фото
const closePicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

// Действия при нажатии клавиши Escape
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydown);
    closePicture();
  }
};

// Добавление блока с комментариями
const addComments = (comments, commentsCount) => {
  const fromCommentsCount = commentsCount - SHOWN_COMMENTS_COUNT;
  const toCommentsCount =
    commentsCount < comments.length ? commentsCount : comments.length;
  for (let i = fromCommentsCount; i < toCommentsCount; i++) {
    const newComment = bigPictureComment.cloneNode(true);
    newComment.querySelector('img').src = comments[i].avatar;
    newComment.querySelector('img').alt = comments[i].name;
    newComment.querySelector('.social__text').textContent = comments[i].message;
    bigPictureComments.appendChild(newComment);
  }

  bigPictureShownCommentsCount.textContent = toCommentsCount;
  return commentsCount + SHOWN_COMMENTS_COUNT;
};

// Открытие формы полноразмерного просмотра фото
const openPicture = (post) => {
  sourcePost = post;
  shownComments = SHOWN_COMMENTS_COUNT;
  bigPictureImg.src = post.url;
  bigPictureCaption.textContent = post.description;
  bigPictureLikesCount.textContent = post.likes;
  bigPictureTotalCommentsCount.textContent = post.comments.length;
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  while (bigPictureComments.firstChild) {
    bigPictureComments.removeChild(bigPictureComments.firstChild);
  }
  shownComments = addComments(post.comments, shownComments);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Событие клика на кнопке "Загрузить еще"
actionBigPictureCommentsLoad.addEventListener('click', () => {
  if (shownComments < sourcePost.comments.length + SHOWN_COMMENTS_COUNT) {
    shownComments = addComments(sourcePost.comments, shownComments);
  }
});

// Событие закрытия формы по клику мыши
actionBigPictureCancel.addEventListener('click', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  closePicture();
});

// Событие закрытия формы по нажатию Enter на кнопке закрытия
actionBigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    document.removeEventListener('keydown', onDocumentKeydown);
    closePicture();
  }
});

export { openPicture };
