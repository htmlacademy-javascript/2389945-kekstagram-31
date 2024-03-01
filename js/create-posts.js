import {
  MAX_COMMENTS_COUNT,
  MAX_LIKES_COUNT,
  MIN_COMMENTS_COUNT,
  MIN_LIKES_COUNT,
  POSTS_COUNT,
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
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Получение уникального Id фотокарточки
const uniquePostId = createRandomIdFromRangeGenerator(1, 25);
// Получение уникального Id фотографии
const uniquePhotoImageId = createRandomIdFromRangeGenerator(1, 25);

// Создание объекта фотокарточки
const createPost = () => ({
  id: uniquePostId(),
  url: `photos/${uniquePhotoImageId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT) },
    createComment
  ),
});

// Добавление объекта фотокарточки в массив
const createPosts = () => Array.from({ length: POSTS_COUNT }, createPost);

export { createPosts };
