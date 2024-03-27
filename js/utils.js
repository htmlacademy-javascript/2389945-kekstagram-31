import { HashtagsValidateOptions, FILE_TYPES } from './config.js';
import { getPictureById } from './picture-state.js';
import { onReceiveError } from './server-data.js';

// Устранение "дребезга"
const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Вычисление случайного числа в диапазоне
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Вычисление случайного уникального числа в диапазоне
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Получение случайного элемента массива
const getRandomArrayElement = (array) => {
  const uniqueElementId = createRandomIdFromRangeGenerator(0, array.length - 1);
  return array[uniqueElementId()];
};

// Получение случайного массива заданного размера
const getUniqueRandomArray = (sourceArray, resultArraySize) => {
  const resultIndex = new Set();
  while (resultIndex.size !== Math.min(resultArraySize, sourceArray.length)) {
    resultIndex.add(getRandomInteger(0, sourceArray.length - 1));
  }

  const resultArray = [];
  resultIndex.forEach((value) => resultArray.push(sourceArray[value]));
  return resultArray;
};

// Сравнение количества комментариев у двух фотографий
const comparePicturesComments = (pictureOne, pictureTwo) => {
  const rankOne = getPictureById(pictureOne.id).comments.length;
  const rankTwo = getPictureById(pictureTwo.id).comments.length;
  return rankTwo - rankOne;
};

// Нажата клавиша Enter
const isEnterKey = (evt) => evt.key === 'Enter';

// Нажата клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Проверка массива на наличие дублей
const isArrayDuplicates = (array) => new Set(array).size !== array.length;

// Проверка строки на соответствие шаблону
const validatePattern = (array) =>
  array.every((item) => HashtagsValidateOptions.PATTERN.test(item));

// Отформатировать знвчение масштаба
const formatScale = (value) => Number(value.replace('%', ''));

// Получение расположения файла
const getFilePath = (file) => {
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    return URL.createObjectURL(file);
  } else {
    onReceiveError('Неверный формат файла');
  }
};

export {
  isArrayDuplicates,
  comparePicturesComments,
  createRandomIdFromRangeGenerator,
  debounce,
  formatScale,
  getRandomArrayElement,
  getRandomInteger,
  getUniqueRandomArray,
  isEnterKey,
  isEscapeKey,
  validatePattern,
  getFilePath,
};
