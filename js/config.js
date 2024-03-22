export const PICTURES_DEFAULT_COUNT = 25; // Количество фотографий, отображаемых по умолчанию
export const PICTURES_RANDOM_COUNT = 10; // Количество случайных фотографий
export const MIN_COMMENTS_COUNT = 1; // Минимальное число комментариев к фото
export const MAX_COMMENTS_COUNT = 30; // Максимальное число комментариев к фото
export const MIN_LIKES_COUNT = 1; // Минимальное число лайков к фото
export const MAX_LIKES_COUNT = 30; // Максимальное число лайков к фото
export const SHOWN_COMMENTS_COUNT = 5; // Количество комментариев отображаемых по умолчанию
export const AVATARS_COUNT = 6; // Количество аватарок
export const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i; // Шаблон для хэштега
export const DESCRIPTION_LENGTH = 140; // Максимальная длина комментария
export const MAX_HASHTAGS_COUNT = 5; // Максимальное количество хэштегов
export const MIN_HASHTAG_LENGTH = 2; // Минимальная длина хэштега
export const MAX_HASHTAG_LENGTH = 20; // Минимальная длина хэштега
export const HASHTAGS_SPLITTER = ' '; // Разделитель хэштегов
export const MIN_SCALE_VALUE = 25; // Минимальное значение масштаба (в процентах)
export const MAX_SCALE_VALUE = 100; // Минимальное значение масштаба (в процентах)
export const SCALE_STEP = 25; // Шаг масштабирования фото (в процентах)
export const DEFAULT_SCALE = '100%';
export const ERROR_SHOW_TIMEOUT = 5000;
export const DEBOUNCE_TIMEOUT = 500;
export const DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

export const Router = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

export const effectsConfig = {
  none: {
    range: {
      min: 0,
      max: 0,
    },
    step: 0,
    style: () => 'none',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    style: (value) => `grayscale(${value})`,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    style: (value) => `sepia(${value})`,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    style: (value) => `invert(${value}%)`,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    style: (value) => `blur(${value}px)`,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    style: (value) => `brightness(${value})`,
  },
};
