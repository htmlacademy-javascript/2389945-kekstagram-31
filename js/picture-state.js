// Объект для хранения общего пула фото с текущим состоянием выбранного фото
const pictureState = {
  pictures: null,
  currentOpenedPicture: null,
  currentOpenedComments: 0,
};

// Инициализация пула фотографий
const setPictures = (pictures) => {
  pictureState.pictures = pictures;
};

// Установить текущее выбранное фото
const setCurrentOpenedPicture = (picture) => {
  pictureState.currentOpenedPicture = picture;
};

// Получить текущее выбранное фото
const getCurrentOpenedPicture = () => pictureState.currentOpenedPicture;

// Установить количество открытых (просмотренных) комментариев
const setCurrentOpenedComments = (count) => {
  pictureState.currentOpenedComments = count;
};

// Получить количество открытых (просмотренных) комментариев
const getCurrentOpenedComments = () => pictureState.currentOpenedComments;

// Получить фото по id
const getPictureById = function (id) {
  return pictureState.pictures.find((picture) => picture.id === id);
};

// Получить массив комментариев текущего открытого фото
const getCommentsFromCurrentPicture = () =>
  getPictureById(getCurrentOpenedPicture()).comments;

// Получить общее количество комментариев текущего открытого фото
const getCurrentTotalComments = () => getCommentsFromCurrentPicture().length;

// Сбросить состояние текущего отерытого фото
const clearPictureState = () => {
  pictureState.currentOpenedComments = 0;
  pictureState.currentOpenedPicture = null;
};

export {
  clearPictureState,
  getCommentsFromCurrentPicture,
  getCurrentOpenedComments,
  getCurrentOpenedPicture,
  getCurrentTotalComments,
  getPictureById,
  pictureState,
  setCurrentOpenedComments,
  setCurrentOpenedPicture,
  setPictures,
};
