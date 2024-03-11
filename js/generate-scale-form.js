import { MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_STEP } from './config.js';
import {
  scaleBigger,
  scaleSmaller,
  scaleValue,
  uploadPreview,
} from './shared.js';

const scalePicture = (value) => {
  scaleValue.value = `${+scaleValue.value.replace('%', '') + value}%`;
  uploadPreview.querySelector('img').style = `transform: scale(${
    +scaleValue.value.replace('%', '') / 100
  })`;
};

const onScaleSmallerClick = () => {
  if (
    scaleValue.value.replace('%', '') > MIN_SCALE_VALUE &&
    scaleValue.value.replace('%', '') <= MAX_SCALE_VALUE
  ) {
    scalePicture(-SCALE_STEP);
  }
};

const onScaleBiggerClick = () => {
  if (
    scaleValue.value.replace('%', '') >= MIN_SCALE_VALUE &&
    scaleValue.value.replace('%', '') < MAX_SCALE_VALUE
  ) {
    scalePicture(SCALE_STEP);
  }
};

const processScale = () => {
  scaleSmaller.addEventListener('click', (evt) => onScaleSmallerClick());
  scaleBigger.addEventListener('click', (evt) => onScaleBiggerClick());
};

export { processScale };
