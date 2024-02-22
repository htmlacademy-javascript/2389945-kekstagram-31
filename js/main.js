// Список имен комментаторов
const NAMES = [
  'Cаша',
  'Маша',
  'Даша',
  'Петя',
  'Вова',
  'Лена',
  'Юля',
  'Артём',
  'Коля',
  'Лёша',
];

// Список описаний фото
const DESCRIPTIONS = [
  'Я на даче',
  'А это на море',
  'Мой кот',
  'В горах...',
  'На празднике',
  'С друзьями',
];

// Список комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTOCARDS_COUNT = 25; // Количество фотографий
const MAX_COMMENTS_COUNT = 30; // Максимальное число комментариев к фото
const MAX_LIKES_COUNT = 30; // Максимальное число лайков к фото

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
};

// Получение случайного элемента массива
const getRandomArrayElement = (elements) => {
  const uniqueElementId = createRandomIdFromRangeGenerator(
    0,
    elements.length - 1
  );
  return elements[uniqueElementId()];
};

// Получение уникального Id комментария
const getUniqueCommentId = createRandomIdFromRangeGenerator(1, PHOTOCARDS_COUNT * MAX_COMMENTS_COUNT);

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
  likes: getRandomInteger(1, MAX_LIKES_COUNT),
  comments: Array.from({ length: getRandomInteger(1, MAX_COMMENTS_COUNT) }, createComment),
});

// Добавление объекта фотокарточки в массив
const photoCards = Array.from({ length: PHOTOCARDS_COUNT }, createPhotoCard);

// eslint-disable-next-line no-console
console.log(photoCards);
