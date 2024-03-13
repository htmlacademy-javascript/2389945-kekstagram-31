import {
  MAX_COMMENTS_COUNT,
  MAX_LIKES_COUNT,
  MIN_COMMENTS_COUNT,
  MIN_LIKES_COUNT,
  POSTS_COUNT,
  AVATARS_COUNT,
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
  POSTS_COUNT * MAX_COMMENTS_COUNT
);

// Создание объекта комментария
const createComment = () => ({
  id: getUniqueCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Получение уникального Id поста
const uniquePictureId = createRandomIdFromRangeGenerator(1, POSTS_COUNT);

// Получение уникального Id фотографии
const uniquePictureImageId = createRandomIdFromRangeGenerator(1, POSTS_COUNT);

// Создание объекта поста
const createPicture = () => ({
  id: uniquePictureId(),
  url: `photos/${uniquePictureImageId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT) },
    createComment
  ),
});

// Добавление объекта поста в массив
const createPictures = () => Array.from({ length: POSTS_COUNT }, createPicture);

export { createPictures };
