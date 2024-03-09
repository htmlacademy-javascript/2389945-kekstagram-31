import { HASHTAG_PATTERN } from './config.js';

// Вычисление случайного числа в диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
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
const getRandomArrayElement = (elements) => {
  const uniqueElementId = createRandomIdFromRangeGenerator(
    0,
    elements.length - 1
  );
  return elements[uniqueElementId()];
};

// Нажата клавиша Enter
const isEnterKey = (evt) => evt.key === 'Enter';

// Нажата клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Проверка массива на наличие дублей
const arrayHasDuplicates = (array) => new Set(array).size !== array.length;

// Проверка строки на соответствие шаблону
const validatePattern = (array) =>
  array.every((item) => HASHTAG_PATTERN.test(item));

export {
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  getRandomInteger,
  isEnterKey,
  isEscapeKey,
  arrayHasDuplicates,
  validatePattern,
};
