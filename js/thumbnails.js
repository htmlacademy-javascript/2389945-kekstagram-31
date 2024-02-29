import { createPhotoCards } from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const photoCards = createPhotoCards();

const createThumbnails = () => {
  for (let i = 0; i < photoCards.length; i++) {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = photoCards[i].url;
    newPicture.querySelector('.picture__img').alt = photoCards[i].description;
    newPicture.querySelector('.picture__likes').textContent =
      photoCards[i].likes;
    newPicture.querySelector('.picture__comments').textContent =
      photoCards[i].comments.length;

    fragment.appendChild(newPicture);
  }
  pictures.appendChild(fragment);
  // eslint-disable-next-line no-console
  // console.log(pictures);
};

export { createThumbnails };
