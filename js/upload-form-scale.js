import {
  DEFAULT_SCALE,
  MAX_SCALE_VALUE,
  MIN_SCALE_VALUE,
  SCALE_STEP,
} from './config.js';
import { scaleControlElement, uploadPreviewElement } from './dom-elements.js';
import { formatScale } from './utils.js';

// Масштабирование изображения
const scalePicture = (value) => {
  scaleControlElement.value = `${formatScale(scaleControlElement.value) + value}%`;
  uploadPreviewElement.querySelector('img').style.transform = `scale(${
    formatScale(scaleControlElement.value) / formatScale(DEFAULT_SCALE)
  })`;
};

// Обработка нажатия на кнопку уменьшения масштаба
const onScaleSmallerClick = () =>
  formatScale(scaleControlElement.value) > MIN_SCALE_VALUE
    ? scalePicture(-SCALE_STEP)
    : null;

// Обработка нажатия на кнопку увеличения масштаба
const onScaleBiggerClick = () =>
  formatScale(scaleControlElement.value) < MAX_SCALE_VALUE
    ? scalePicture(SCALE_STEP)
    : null;

export { onScaleBiggerClick, onScaleSmallerClick, scalePicture };
