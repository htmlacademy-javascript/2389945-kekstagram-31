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

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

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
  document.addEventListener('keydown', onDocumentKeydown);
};

function closePicture() {
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}

pictureCancel.addEventListener('click', () => {
  closePicture();
});

pictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePicture();
  }
});

export { openPicture };
