import { getServerData, showError } from './server-data.js';
import { setPictures } from './picture-state.js';
import { createPictureThumbnails } from './picture-thumbnails.js';

// Добавление объекта фото в массив
const createPictures = () =>
  getServerData()
    .then((pictures) => {
      setPictures(pictures);
      createPictureThumbnails();
    })
    .catch((err) => {
      showError(err.message);
    });

export { createPictures };
