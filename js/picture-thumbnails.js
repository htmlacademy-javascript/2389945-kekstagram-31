import {
  fragment,
  pictureTemplate,
  pictures,
  pictureFilters,
} from './dom-elements.js';
import { openPicture } from './picture-comments.js';
import { pictureState, getPictureById } from './picture-state.js';

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

const compareComments = (pictureA, pictureB) => {
  const rankA = getPictureById(pictureA.id).comments.length;
  const rankB = getPictureById(pictureB.id).comments.length;
  return rankB - rankA;
};

// Создание миниатюр фотографий
const createPictureThumbnails = (evt) => {
  let filteredPictures;
  //console.log(evt.target);
  if (evt) {
    //console.log(evt.target);
    if (evt.target.id === 'filter-default') {
      filteredPictures = pictureState.pictures.slice();
      console.log(filteredPictures);
    } else if (evt.target.id === 'filter-discussed') {
      //'filter-random': (pictures) =>
      //  getUniqueRandomArrayElement(pictures, PICTURE_RANDOM_COUNT),

      filteredPictures = pictureState.pictures.slice().sort(compareComments);
      console.log(filteredPictures);
    }
  } else {
    filteredPictures = pictureState.pictures.slice();
  }
  /*
  if (evt.target.id === 'filter-default') {
    filteredPictures = pictureState.pictures.slice();
  } else if (evt.target.id === 'filter-discussed') {
    //'filter-random': (pictures) =>
    //  getUniqueRandomArrayElement(pictures, PICTURE_RANDOM_COUNT),
    filteredPictures = pictureState.pictures.slice().sort(compareComments);
  } else {
    filteredPictures = pictureState.pictures.slice();
  }
  */

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

const onFilterClick = (evt) => {
  evt.preventDefault();
  console.log(evt.target);
  pictures
    .querySelectorAll('.picture')
    .forEach((element) => element.parentNode.removeChild(element));
  createPictureThumbnails(evt);
};

pictureFilters.addEventListener('click', onFilterClick);

export { createPictureThumbnails };
