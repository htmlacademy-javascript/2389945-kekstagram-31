import {
  MAX_COMMENTS_COUNT,
  MAX_LIKES_COUNT,
  MIN_COMMENTS_COUNT,
  MIN_LIKES_COUNT,
  PHOTOCARDS_COUNT,
} from './config.js';

import {
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  getRandomInteger,
} from './utils.js';

import { DESCRIPTIONS, MESSAGES, NAMES } from './data.js';

// Получение уникального Id комментария
const getUniqueCommentId = createRandomIdFromRangeGenerator(
  1,
  PHOTOCARDS_COUNT * MAX_COMMENTS_COUNT
);

// Создание объекта комментария
const createComment = () => ({
  id: getUniqueCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Получение уникального Id фотокарточки
const uniquePhotoCardId = createRandomIdFromRangeGenerator(1, 25);
// Получение уникального Id фотографии
const uniquePhotoImageId = createRandomIdFromRangeGenerator(1, 25);

// Создание объекта фотокарточки
const createPhotoCard = () => ({
  id: uniquePhotoCardId(),
  url: `photos/${uniquePhotoImageId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT) },
    createComment
  ),
});

// Добавление объекта фотокарточки в массив
const createPhotoCards = () =>
  Array.from({ length: PHOTOCARDS_COUNT }, createPhotoCard);

export { createPhotoCards };
