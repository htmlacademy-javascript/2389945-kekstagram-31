import { DATA_URL, ERROR_SHOW_TIMEOUT, Method, Router } from './config.js';
import {
  body as bodyDOM,
  dataErrorTemplate,
  dataErrorTitle,
  successButton,
  successTemplate,
  errorButton,
  errorTemplate,
} from './dom-elements.js';

import { closeUpload } from './upload-form.js';

// Отображение сообщения об ошибке при отправке или получении данных
const onReceiveError = (errorText) => {
  dataErrorTitle.textContent = errorText;
  bodyDOM.appendChild(dataErrorTemplate);
  setTimeout(() => {
    dataErrorTemplate.remove();
  }, ERROR_SHOW_TIMEOUT);
};

// Отображение формы успешной отправки данных
const onSendSuccess = () => {
  bodyDOM.classList.remove('modal-open');
  const onDataSuccessButtonKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      dataSuccessFormClose(evt);
    }
  };

  bodyDOM.appendChild(successTemplate);
  document.addEventListener('keydown', onDataSuccessButtonKeyDown);

  const onDataSuccessButtonClick = (evt) => {
    if (evt.target === successTemplate || evt.target === successButton) {
      dataSuccessFormClose(evt);
      closeUpload();
    }
  };

  function dataSuccessFormClose() {
    successTemplate.remove();
    document.removeEventListener('keydown', onDataSuccessButtonKeyDown);
    successTemplate.removeEventListener('click', onDataSuccessButtonClick);
  }

  successTemplate.addEventListener('click', onDataSuccessButtonClick);
};

const onSendError = () => {
  bodyDOM.classList.remove('modal-open');
  const onDataErrorButtonKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      dataErrorFormClose(evt);
    }
  };

  bodyDOM.appendChild(errorTemplate);
  document.addEventListener('keydown', onDataErrorButtonKeyDown);

  const onDataErrorButtonClick = (evt) => {
    if (evt.target === errorTemplate || evt.target === errorButton) {
      dataErrorFormClose(evt);
      //closeUpload();
    }
  };

  function dataErrorFormClose() {
    errorTemplate.remove();
    document.removeEventListener('keydown', onDataErrorButtonKeyDown);
    errorTemplate.removeEventListener('click', onDataErrorButtonClick);
  }

  errorTemplate.addEventListener('click', onDataErrorButtonClick);
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

export {
  getServerData,
  sendServerData,
  onReceiveError,
  onSendSuccess,
  onSendError,
};
