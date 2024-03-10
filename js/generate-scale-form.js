import { MIN_SCALE_VALUE, MAX_SCALE_VALUE, SCALE_STEP } from './config.js';
import {
  scaleSmaller,
  scaleBigger,
  scaleValue,
  uploadPreview,
} from './shared.js';

const onScaleSmallerClick = () => {
  if (
    scaleValue.value.replace('%', '') > MIN_SCALE_VALUE &&
    scaleValue.value.replace('%', '') <= MAX_SCALE_VALUE
  ) {
    scaleValue.value = `${+scaleValue.value.replace('%', '') - SCALE_STEP}%`;
    uploadPreview.querySelector('img').style = `transform: scale(${
      +scaleValue.value.replace('%', '') / 100
    })`;
  }
};

const onScaleBiggerClick = () => {
  if (
    scaleValue.value.replace('%', '') >= MIN_SCALE_VALUE &&
    scaleValue.value.replace('%', '') < MAX_SCALE_VALUE
  ) {
    scaleValue.value = `${+scaleValue.value.replace('%', '') + SCALE_STEP}%`;
    uploadPreview.querySelector('img').style = `transform: scale(${
      +scaleValue.value.replace('%', '') / 100
    })`;
  }
};

const processScale = () => {
  scaleSmaller.addEventListener('click', (evt) => onScaleSmallerClick());
  scaleBigger.addEventListener('click', (evt) => onScaleBiggerClick());
};

export { processScale };
