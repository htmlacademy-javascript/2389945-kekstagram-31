import { getServerData, onReceiveError } from './server-data.js';
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
      onReceiveError(err.message);
    });

export { createPictures };
