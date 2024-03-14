import {
  effectsList,
  sliderContainer,
  sliderControl,
  sliderValue,
  uploadPreview,
} from './dom-elements.js';

import { effectsConfig } from './config.js';

// Общая процедура обработки эффектов
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

  // Получение текущего выбранного эффекта
  const getCurrentEffect = function () {
    return effectsList.querySelector(
      'input[type="radio"][name="effect"]:checked'
    ).value;
  };

  // Процедура обработки события изменения значения слайдера
  const onSliderChange = () => {
    const currentEffect = getCurrentEffect();
    const currentFilterValue = effectsConfig[currentEffect].style(
      sliderValue.value
    );
    sliderValue.value = sliderControl.noUiSlider.get();
    uploadPreview.querySelector('img').style.filter = currentFilterValue;
  };

  // Процедура обработки события изменения выбранного эффекта
  const onEffectsListChange = () => {
    const effectItem = effectsList.querySelector(
      'input[type="radio"][name="effect"]:checked'
    );
    if (effectItem.value === 'none') {
      sliderContainer.classList.add('hidden');
    } else {
      sliderContainer.classList.remove('hidden');
    }
    sliderControl.noUiSlider.updateOptions(effectsConfig[effectItem.value]);
    sliderControl.noUiSlider.set(effectsConfig[effectItem.value].range.max);
    onSliderChange();
  };

  // Обработчик события изменения выбранного эффекта
  effectsList.addEventListener('change', onEffectsListChange);

  // Обработчик события изменения значения слайдера
  sliderControl.noUiSlider.on('update', onSliderChange);

  onEffectsListChange();
};

// Процедура удаления слайдера
const destroyUploadFormSlider = () => sliderControl.noUiSlider.destroy();

export { destroyUploadFormSlider, uploadFormEffects };
