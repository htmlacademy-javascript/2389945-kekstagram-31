import { isEnterKey, isEscapeKey } from './utils';
import { SHOWN_COMMENTS_COUNT } from './config';

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
const addComments = (post, commentsCount) => {
  post.comments.forEach((item, index) => {
    const newComment = bigPictureComment.cloneNode(true);
    const fromCommentsCount = commentsCount - SHOWN_COMMENTS_COUNT;
    newComment.querySelector('img').src = item.avatar;
    newComment.querySelector('img').alt = item.name;
    newComment.querySelector('.social__text').textContent = item.message;
    if (index >= fromCommentsCount && index < commentsCount) {
      bigPictureComments.appendChild(newComment);
    }
  });
  bigPictureShownCommentsCount.textContent =
    commentsCount < post.comments.length ? commentsCount : post.comments.length;
  return commentsCount + SHOWN_COMMENTS_COUNT;
};

// Открытие формы полноразмерного просмотра фото
const openPicture = (post) => {
  sourcePost = post;
  shownComments = SHOWN_COMMENTS_COUNT;
  //console.log(shownComments);
  bigPictureImg.src = post.url;
  bigPictureCaption.textContent = post.description;
  bigPictureLikesCount.textContent = post.likes;
  bigPictureTotalCommentsCount.textContent = post.comments.length;
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  while (bigPictureComments.firstChild) {
    bigPictureComments.removeChild(bigPictureComments.firstChild);
  }
  shownComments = addComments(post, shownComments);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Событие клика на кнопке "Загрузить еще"
actionBigPictureCommentsLoad.addEventListener('click', () => {
  shownComments = addComments(sourcePost, shownComments);
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
