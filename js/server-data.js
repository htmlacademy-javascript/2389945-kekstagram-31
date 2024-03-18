import { DATA_URL, ERROR_SHOW_TIMEOUT, Method, Router } from './config.js';
import {
  dataErrorTemplate,
  dataErrorTitle,
  dataSuccessButton,
  dataSuccessTemplate,
} from './dom-elements.js';

import { closeUpload } from './upload-form.js';

const showError = (errorText) => {
  dataErrorTitle.textContent = errorText;
  document.body.appendChild(dataErrorTemplate);
  setTimeout(() => {
    dataErrorTemplate.remove();
  }, ERROR_SHOW_TIMEOUT);
};

const showSuccess = () => {
  const onDataSuccessButtonKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      dataSuccessFormClose(evt);
    }
  };

  document.body.appendChild(dataSuccessTemplate);
  document.addEventListener('keydown', onDataSuccessButtonKeyDown);

  const onDataSuccessButtonClick = (evt) => {
    dataSuccessFormClose(evt);
  };

  function dataSuccessFormClose() {
    dataSuccessTemplate.remove();
    document.removeEventListener('keydown', onDataSuccessButtonKeyDown);
    dataSuccessButton.removeEventListener('click', onDataSuccessButtonClick);
    closeUpload();
  }

  dataSuccessButton.addEventListener('click', onDataSuccessButtonClick);
};

const sendRequest = (router, method, errorText, body = null) =>
  fetch(`${DATA_URL}${router}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getServerData = () =>
  sendRequest(
    Router.GET_DATA,
    Method.GET,
    'Ошибка загрузки данных. Обновите страницу позднее'
  );

const sendServerData = (body) =>
  sendRequest(
    Router.SEND_DATA,
    Method.POST,
    'Ошибка отправки данных. Обновите страницу позднее',
    body
  );

export { getServerData, sendServerData, showError, showSuccess };
