// Объект для хранения общего пула фото с текущим состоянием выбранного фото
const pictureState = {
  pictures: null,
  currentOpenedPicture: null,
  currentOpenedComments: 0,
};

// Инициализация пула постов
const setPictures = (pictures) => {
  pictureState.pictures = pictures;
};

// Установить текущий выбранный пост
const setCurrentOpenedPicture = (picture) => {
  pictureState.currentOpenedPicture = picture;
};

// Получить текущий выбранный пост
const getCurrentOpenedPicture = () => pictureState.currentOpenedPicture;

// Установить количество открытых (просмотренных) комментариев
const setCurrentOpenedComments = (count) => {
  pictureState.currentOpenedComments = count;
};

// Получить количество открытых (просмотренных) комментариев
const getCurrentOpenedComments = () => pictureState.currentOpenedComments;

// Получить пост по id
const getPictureById = function (id) {
  return pictureState.pictures.find((el) => el.id === id);
};

// Получить массив комментариев текущего открытого поста
const getCommentsFromCurrentPicture = () =>
  getPictureById(getCurrentOpenedPicture()).comments;

// Получить общее количество комментариев текущего открытого поста
const getCurrentTotalComments = () => getCommentsFromCurrentPicture().length;

// Сбросить состояние текущего отерытого поста
const clearPictureState = () => {
  pictureState.currentOpenedComments = 0;
  pictureState.currentOpenedPicture = null;
};

export {
  pictureState,
  setPictures,
  getCommentsFromCurrentPicture,
  getCurrentOpenedComments,
  getCurrentOpenedPicture,
  getCurrentTotalComments,
  getPictureById,
  setCurrentOpenedComments,
  setCurrentOpenedPicture,
  clearPictureState,
};
