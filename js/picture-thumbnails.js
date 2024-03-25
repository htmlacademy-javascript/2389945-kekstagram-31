import {
  documentFragment,
  pictureFiltersContainerElement,
  pictureTemplateElement,
  picturesContainerElement,
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
    pictureState.pictures.some((picture) => picture.id === Number(id)) &&
    id !== ''
  ) {
    openPicture(id);
  }
};

// Создание миниатюр фотографий
const createPictureThumbnails = (evt) => {
  const filteredPictures = getFilteredPictures(evt);

  filteredPictures.forEach((picture) => {
    const newPicture = pictureTemplateElement.cloneNode(true);
    const pictureImg = newPicture.querySelector('.picture__img');
    pictureImg.id = picture.id;
    pictureImg.src = picture.url;
    pictureImg.alt = picture.description;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    newPicture.querySelector('.picture__comments').textContent =
      picture.comments.length;
    documentFragment.appendChild(newPicture);
  });
  pictureFiltersContainerElement.classList.remove('img-filters--inactive');
  picturesContainerElement.appendChild(documentFragment);
  picturesContainerElement.addEventListener('click', onPicturesClick);
};

// Обработка действия при смене фильтра
const onPictureFiltersClick = (evt) => {
  evt.preventDefault();
  pictureThumbnailsFilter(evt);
};

pictureFiltersContainerElement.addEventListener('click', onPictureFiltersClick);

export { createPictureThumbnails };
