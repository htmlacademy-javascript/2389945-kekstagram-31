export const PICTURES_RANDOM_COUNT = 10; // Количество случайных фотографий
export const SHOWN_COMMENTS_COUNT = 5; // Количество комментариев отображаемых по умолчанию
export const DESCRIPTION_LENGTH = 140; // Максимальная длина комментария
export const ERROR_SHOW_TIMEOUT = 5000; //Таймаут показа сообщения об ошибке
export const DEBOUNCE_TIMEOUT = 500; // Таймаут переключения фильтров
export const DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram'; // Адрес сервера
export const FILE_TYPES = ['jpg', 'jpeg', 'png']; // Допустимые типы загружаемых файлов

// Настройки масштабирования
export const ScaleOptions = {
  DEFAULT_SCALE_VALUE: '100%',
  MIN_SCALE_VALUE: 25,
  MAX_SCALE_VALUE: 100,
  SCALE_STEP: 25,
};

// Настройки валидации хэштегов
export const HashtagsValidateOptions = {
  MAX_HASHTAGS_COUNT: 5,
  HASHTAGS_SPLITTER: ' ',
  HASHTAG_PATTERN: /^#[a-zа-яё0-9]{1,19}$/i
};

// Адресация запроса
export const Router = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// POST/GET
export const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Фильтры
export const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

// Настройки эффектов
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
