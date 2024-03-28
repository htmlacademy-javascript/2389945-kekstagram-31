import { effectsConfig } from './config.js';
import {
  effectsListContainerElement,
  sliderContainerElement,
  sliderControlElement,
  sliderValueElement,
  uploadPreviewElement,
} from './dom-elements.js';

// Инициализация слайдера
const createSlider = () => {
  noUiSlider.create(sliderControlElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
};

// Получение текущего выбранного эффекта
const getCurrentEffect = () =>
  effectsListContainerElement.querySelector('input[type="radio"][name="effect"]:checked').value;

// Обработка события изменения значения слайдера
const onSliderChange = (currentEffect) => {
  sliderValueElement.value = sliderControlElement.noUiSlider.get();
  const currentFilterValue = effectsConfig[currentEffect].getStyle(
    sliderValueElement.value
  );
  uploadPreviewElement.querySelector('img').style.filter = currentFilterValue;
};

// Обработка события изменения выбранного эффекта
const onEffectsListChange = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  const currentEffect = getCurrentEffect();
  if (currentEffect === 'none') {
    sliderContainerElement.classList.add('hidden');
  } else {
    sliderContainerElement.classList.remove('hidden');
  }
  sliderControlElement.noUiSlider.updateOptions(effectsConfig[currentEffect]);
  sliderControlElement.noUiSlider.set(effectsConfig[currentEffect].range.max);
  onSliderChange(getCurrentEffect());
};

// Общая функция обработки эффектов
const uploadFormEffects = () => {
  // Обработчик события изменения выбранного эффекта
  effectsListContainerElement.addEventListener('change', onEffectsListChange);

  // Обработчик события изменения значения слайдера
  sliderControlElement.noUiSlider.on('slide', () =>
    onSliderChange(getCurrentEffect())
  );
  onEffectsListChange();
};

export { uploadFormEffects, createSlider };
