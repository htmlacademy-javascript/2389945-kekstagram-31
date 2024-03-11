import { sliderControl, sliderValue, effectsList, uploadPreview } from './shared.js';

const processSlider = () => {
  noUiSlider.create(sliderControl, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  /*
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
  */
  });

  const getCurrentEffect = function () {
    return effectsList.querySelector(
      'input[type="radio"][name="effect"]:checked'
    ).value;
  };

  sliderControl.noUiSlider.on('update', () => {
    const currentEffect = getCurrentEffect();
    sliderValue.value = sliderControl.noUiSlider.get();
    uploadPreview.querySelector('img').style = 'filter: grayscale(0.5)';

    console.log(sliderValue.value, currentEffect);
  });
};

export { processSlider };
