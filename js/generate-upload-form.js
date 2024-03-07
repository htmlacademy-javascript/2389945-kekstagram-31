import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadOverlay.querySelector('#upload-cancel');

const processUpload = () => {
  // Действия при нажатии клавиши Escape
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUpload();
    }
  };

  const openUpload = () => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  };

  uploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUpload();
  });

  uploadCancel.addEventListener('click', () => {
    closeUpload();
  });

  function closeUpload() {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadInput.value = '';
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

export { processUpload };
