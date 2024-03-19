import { DATA_URL, ERROR_SHOW_TIMEOUT, Method, Router } from './config.js';
import {
  dataErrorTemplate,
  dataErrorTitle,
  dataSuccessButton,
  dataSuccessTemplate,
} from './dom-elements.js';

import { closeUpload } from './upload-form.js';

// Отображение сообщения об ошибке при отправке или получении данных
const onError = (errorText) => {
  dataErrorTitle.textContent = errorText;
  document.body.appendChild(dataErrorTemplate);
  setTimeout(() => {
    dataErrorTemplate.remove();
  }, ERROR_SHOW_TIMEOUT);
};

// Отображение формы успешной отправки данных
const onSuccess = () => {
  const onDataSuccessButtonKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      dataSuccessFormClose(evt);
    }
  };

  document.body.appendChild(dataSuccessTemplate);
  document.addEventListener('keydown', onDataSuccessButtonKeyDown);

  const onDataSuccessButtonClick = (evt) => {
    if (
      evt.target === dataSuccessTemplate ||
      evt.target === dataSuccessButton
    ) {
      dataSuccessFormClose(evt);
      closeUpload();
    }
  };

  function dataSuccessFormClose() {
    dataSuccessTemplate.remove();
    document.removeEventListener('keydown', onDataSuccessButtonKeyDown);
    dataSuccessTemplate.removeEventListener('click', onDataSuccessButtonClick);
  }

  dataSuccessTemplate.addEventListener('click', onDataSuccessButtonClick);
};

// Функция отправки запроса на сервер
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

// Функция получения данных с сервера
const getServerData = () =>
  sendRequest(
    Router.GET_DATA,
    Method.GET,
    'Ошибка загрузки данных. Обновите страницу позднее'
  );

// Функция отправки данных на сервер
const sendServerData = (body) =>
  sendRequest(
    Router.SEND_DATA,
    Method.POST,
    'Ошибка отправки данных. Обновите страницу позднее',
    body
  );

export { getServerData, sendServerData, onError, onSuccess };
