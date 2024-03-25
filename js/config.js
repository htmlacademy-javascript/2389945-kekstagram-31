export const PICTURES_RANDOM_COUNT = 10; // Количество случайных фотографий
export const SHOWN_COMMENTS_COUNT = 5; // Количество комментариев отображаемых по умолчанию
export const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i; // Шаблон для хэштега
export const DESCRIPTION_LENGTH = 140; // Максимальная длина комментария
export const MAX_HASHTAGS_COUNT = 5; // Максимальное количество хэштегов
export const MIN_HASHTAG_LENGTH = 2; // Минимальная длина хэштега
export const MAX_HASHTAG_LENGTH = 20; // Минимальная длина хэштега
export const HASHTAGS_SPLITTER = ' '; // Разделитель хэштегов
export const MIN_SCALE_VALUE = 25; // Минимальное значение масштаба (в процентах)
export const MAX_SCALE_VALUE = 100; // Минимальное значение масштаба (в процентах)
export const SCALE_STEP = 25; // Шаг масштабирования фото (в процентах)
export const DEFAULT_SCALE = '100%'; // Масштаб по-умолчанию
export const ERROR_SHOW_TIMEOUT = 5000;  //Таймаут показа сообщения об ошибке
export const DEBOUNCE_TIMEOUT = 500;  // Таймаут переключения фильтров
export const DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram'; // Адрес сервера
export const FILE_TYPES = ['jpg', 'jpeg', 'png'];  // Допустимые типы загружаемых файлов

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
