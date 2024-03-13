import { openPicture } from './picture-comments.js';
import { pictureState } from './picture-state.js';
import { fragment, pictureTemplate, pictures } from './dom-elements.js';

// Создание миниатюр фотографий
const pictureThumbnails = () => {
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
};

// Обработчик события клика на миниатюре фотографии
pictures.addEventListener('click', (evt) => {
  const id = evt.target.id;
  if (pictureState.pictures.some((picture) => picture.id === +id)) {
    openPicture(id);
  }
});

export { pictureThumbnails };
