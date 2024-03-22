import {
  DEFAULT_SCALE,
  MAX_SCALE_VALUE,
  MIN_SCALE_VALUE,
  SCALE_STEP,
} from './config.js';
import { scaleControl, uploadPreview } from './dom-elements.js';
import { formatScale } from './utils.js';

// Масштабирование изображения
const scalePicture = (value) => {
  scaleControl.value = `${formatScale(scaleControl.value) + value}%`;
  uploadPreview.querySelector('img').style.transform = `scale(${
    formatScale(scaleControl.value) / formatScale(DEFAULT_SCALE)
  })`;
};

// Обработка нажатия на кнопку уменьшения масштаба
const onScaleSmallerClick = () =>
  formatScale(scaleControl.value) > MIN_SCALE_VALUE
    ? scalePicture(-SCALE_STEP)
    : null;

// Обработка нажатия на кнопку увеличения масштаба
const onScaleBiggerClick = () =>
  formatScale(scaleControl.value) < MAX_SCALE_VALUE
    ? scalePicture(SCALE_STEP)
    : null;

export { onScaleBiggerClick, onScaleSmallerClick, scalePicture };
