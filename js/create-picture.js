import { isEnterKey, isEscapeKey } from './utils';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('img');
const caption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const pictureCancel = bigPicture.querySelector('#picture-cancel');
const comments = bigPicture.querySelector('.social__comments');
const comment = bigPicture.querySelector('.social__comment');

// Действия при нажатии клавиши Escape
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

// Добавление блока с комментариями
const addComments = (post) => {
  post.comments.forEach((item) => {
    const newComment = comment.cloneNode(true);
    newComment.querySelector('img').src = item.avatar;
    newComment.querySelector('img').alt = item.name;
    newComment.querySelector('.social__text').textContent = item.message;
    comments.appendChild(newComment);
  });
};

// Открытие формы полноразмерного просмотра фото
const openPicture = (post) => {
  img.src = post.url;
  caption.textContent = post.description;
  likesCount.textContent = post.likes;
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  while (comments.firstChild) {
    comments.removeChild(comments.firstChild);
  }
  addComments(post);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Закрытие формы полноразмерного просмотра фото
const closePicture = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

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

export { openPicture };
