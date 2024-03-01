// Вычисление случайного числа в диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Вычисление случайного уникального числа в диапазоне
//const createRandomIdFromRangeGenerator = (min, max) => {
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Получение случайного элемента массива
const getRandomArrayElement = (elements) => {
  const uniqueElementId = createRandomIdFromRangeGenerator(
    0,
    elements.length - 1
  );
  return elements[uniqueElementId()];
};

export {
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  getRandomInteger,
};
