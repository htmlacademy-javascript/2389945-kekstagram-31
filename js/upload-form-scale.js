import {
  ScaleOptions
} from './config.js';
import { scaleControlElement, uploadPreviewElement } from './dom-elements.js';
import { formatScale } from './utils.js';

// Масштабирование изображения
const scalePicture = (value) => {
  scaleControlElement.value = `${formatScale(scaleControlElement.value) + value}%`;
  uploadPreviewElement.querySelector('img').style.transform = `scale(${
    formatScale(scaleControlElement.value) / formatScale(ScaleOptions.DEFAULT_SCALE_VALUE)
  })`;
};

// Обработка нажатия на кнопку уменьшения масштаба
const onScaleSmallerClick = () =>
  formatScale(scaleControlElement.value) > ScaleOptions.MIN_SCALE_VALUE
    ? scalePicture(-ScaleOptions.SCALE_STEP)
    : null;

// Обработка нажатия на кнопку увеличения масштаба
const onScaleBiggerClick = () =>
  formatScale(scaleControlElement.value) < ScaleOptions.MAX_SCALE_VALUE
    ? scalePicture(ScaleOptions.SCALE_STEP)
    : null;

export { onScaleBiggerClick, onScaleSmallerClick, scalePicture };
