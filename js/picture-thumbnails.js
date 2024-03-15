import { fragment, pictureTemplate, pictures } from './dom-elements.js';
import { openPicture } from './picture-comments.js';
import { pictureState } from './picture-state.js';

// Обработка действия при клике на миниатюре фотографии
const onPicturesClick = (evt) => {
  const id = evt.target.id;
  if (pictureState.pictures.some((picture) => picture.id === +id)) {
    openPicture(id);
  }
};

// Создание миниатюр фотографий
const createPictureThumbnails = () => {
  pictureState.pictures.forEach((picture) => {
    const newPicture = pictureTemplate.cloneNode(true);
    const pictureImg = newPicture.querySelector('.picture__img');
    pictureImg.id = picture.id;
    pictureImg.src = picture.url;
    pictureImg.alt = picture.description;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    newPicture.querySelector('.picture__comments').textContent =
      picture.comments.length;
    fragment.appendChild(newPicture);
  });
  pictures.appendChild(fragment);
  pictures.addEventListener('click', onPicturesClick);
};

export { createPictureThumbnails };
