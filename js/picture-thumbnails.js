import {
  fragment,
  pictureFilters,
  pictureTemplate,
  pictures,
} from './dom-elements.js';
import { openPicture } from './picture-comments.js';
import { pictureState } from './picture-state.js';
import {
  getFilteredPictures,
  pictureThumbnailsFilter,
} from './picture-thumbnails-filter.js';

// Обработка действия при клике на миниатюре фотографии
const onPicturesClick = (evt) => {
  const id = evt.target.id;
  if (
    pictureState.pictures.some((picture) => picture.id === +id) &&
    id !== ''
  ) {
    openPicture(id);
  }
};

// Создание миниатюр фотографий
const createPictureThumbnails = (evt) => {
  const filteredPictures = getFilteredPictures(evt);

  filteredPictures.forEach((picture) => {
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
  pictureFilters.classList.remove('img-filters--inactive');
  pictures.appendChild(fragment);
  pictures.addEventListener('click', onPicturesClick);
};

// Обработка действия при смене фильтра
const onPictureFiltersClick = (evt) => {
  evt.preventDefault();
  pictureThumbnailsFilter(evt);
};

pictureFilters.addEventListener('click', onPictureFiltersClick);

export { createPictureThumbnails };
