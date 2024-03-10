import { scaleSmaller, scaleBigger } from './shared.js';

const processScale = () => {
  scaleSmaller.addEventListener('click', (evt) => console.log(evt.target));
  scaleBigger.addEventListener('click', (evt) => console.log(evt.target));
};

export { processScale };
