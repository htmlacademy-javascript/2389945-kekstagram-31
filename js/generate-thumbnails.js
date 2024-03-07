import { openPicture } from './generate-picture.js';
import { postState } from './generate-state.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

// Создание миниатюр фотографий
const createThumbnails = () => {
  postState.posts.forEach((post) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').id = post.id;
    newPicture.querySelector('.picture__img').src = post.url;
    newPicture.querySelector('.picture__img').alt = post.description;
    newPicture.querySelector('.picture__likes').textContent = post.likes;
    newPicture.querySelector('.picture__comments').textContent =
      post.comments.length;
    fragment.appendChild(newPicture);
  });
  pictures.appendChild(fragment);
};

// Обработчик события клика на миниатюре фотографии
pictures.addEventListener('click', (evt) => {
  const id = evt.target.id;
  openPicture(id);
});

export { createThumbnails };
