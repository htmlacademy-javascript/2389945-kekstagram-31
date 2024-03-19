import { effectsConfig } from './config.js';
import {
  effectsList,
  sliderContainer,
  sliderControl,
  sliderValue,
  uploadPreview,
} from './dom-elements.js';

// Получение текущего выбранного эффекта
const getCurrentEffect = () =>
  effectsList.querySelector('input[type="radio"][name="effect"]:checked').value;

// Обработка события изменения значения слайдера
const onSliderChange = (currentEffect) => {
  sliderValue.value = sliderControl.noUiSlider.get();
  const currentFilterValue = effectsConfig[currentEffect].style(
    sliderValue.value
  );
  uploadPreview.querySelector('img').style.filter = currentFilterValue;
};

// Обработка события изменения выбранного эффекта
const onEffectsListChange = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  const currentEffect = getCurrentEffect();
  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
  sliderControl.noUiSlider.updateOptions(effectsConfig[currentEffect]);
  sliderControl.noUiSlider.set(effectsConfig[currentEffect].range.max);
  onSliderChange(getCurrentEffect());
};

// Общая функция обработки эффектов
const uploadFormEffects = () => {
  // Инициализация слайдера
  noUiSlider.create(sliderControl, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  });

  // Обработчик события изменения выбранного эффекта
  effectsList.addEventListener('change', onEffectsListChange);

  // Обработчик события изменения значения слайдера
  sliderControl.noUiSlider.on('slide', () =>
    onSliderChange(getCurrentEffect())
  );
  onEffectsListChange();
};

// Удаление слайдера
const destroyUploadFormSlider = () => sliderControl.noUiSlider.destroy();

export { destroyUploadFormSlider, uploadFormEffects };
