import { MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_STEP } from './config.js';
import {
  scaleBigger,
  scaleControl,
  scaleSmaller,
  uploadPreview,
} from './shared.js';
import { formatScale } from './utils.js';

// Общая процедура масштабирования
const processScale = () => {
  // Масштабирование изображения
  const scalePicture = (value) => {
    scaleControl.value = `${formatScale(scaleControl.value) + value}%`;
    uploadPreview.querySelector('img').style.transform = `scale(${
      formatScale(scaleControl.value) / 100
    })`;
  };

  // Процедура обработки нажатия на кнопку уменьшения масштаба
  const onScaleSmallerClick = () =>
    formatScale(scaleControl.value) > MIN_SCALE_VALUE
      ? scalePicture(-SCALE_STEP)
      : null;

  // Процедура обработки нажатия на кнопку увеличения масштаба
  const onScaleBiggerClick = () =>
    formatScale(scaleControl.value) < MAX_SCALE_VALUE
      ? scalePicture(SCALE_STEP)
      : null;

  // Обработчик события нажатие на кнопку уменьшения масштаба "-"
  scaleSmaller.addEventListener('click', () => onScaleSmallerClick());
  // Обработчик события нажатие на кнопку увеличения масштаба "+"
  scaleBigger.addEventListener('click', () => onScaleBiggerClick());

  scalePicture(null);
};

export { processScale };
