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

const DESCRIPTIONS = [
  'Я на даче',
  'А это на море',
  'Мой кот',
  'В горах...',
  'На празднике',
  'С друзьями',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTCARDS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator() {
  const previousValues = [];

  return function (min, max) {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const uniqueId = createRandomIdFromRangeGenerator();

const getRandomArrayElement = (elements) =>
  elements[createRandomIdFromRangeGenerator(0, elements.length - 1)];

const createComment = () => ({
  id: createRandomIdFromRangeGenerator(1, 30),
  avatar: `img/avatar-${ createRandomIdFromRangeGenerator(1, 6) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotoCard = () => ({
  id: uniqueId(1, 25), //createRandomIdFromRangeGenerator(),
  url: `photos/${createRandomIdFromRangeGenerator(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(1, 30), //createRandomIdFromRangeGenerator(15, 200),
  comments: Array.from({length: getRandomInteger(1, 30)}, createComment)
});
const photoCards = Array.from({length: PHOTCARDS_COUNT}, createPhotoCard);

console.log(photoCards);
