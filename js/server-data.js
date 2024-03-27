import { DATA_URL, ERROR_SHOW_TIMEOUT, Method, Router } from './config.js';
import {
  dataErrorTemplateElement,
  dataErrorTitleElement,
  successButtonElement,
  successTemplateElement,
  errorButtonElement,
  errorTemplateElement,
} from './dom-elements.js';

import { closeUpload, onDocumentKeydown } from './upload-form.js';

// Отображение сообщения об ошибке при отправке или получении данных
const onReceiveError = (errorText) => {
  dataErrorTitleElement.textContent = errorText;
  document.body.appendChild(dataErrorTemplateElement);
  setTimeout(() => {
    dataErrorTemplateElement.remove();
  }, ERROR_SHOW_TIMEOUT);
};

// Отображение формы успешной отправки данных
const onSendSuccess = () => {
  document.body.classList.remove('modal-open');
  const onDataSuccessButtonKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeDataSuccessForm(evt);
    }
  };

  document.body.appendChild(successTemplateElement);
  document.addEventListener('keydown', onDataSuccessButtonKeyDown);

  const onDataSuccessButtonClick = (evt) => {
    if (evt.target === successTemplateElement || evt.target === successButtonElement) {
      closeDataSuccessForm(evt);
      closeUpload();
    }
  };

  function closeDataSuccessForm() {
    successTemplateElement.remove();
    document.removeEventListener('keydown', onDataSuccessButtonKeyDown);
    successTemplateElement.removeEventListener('click', onDataSuccessButtonClick);
  }

  successTemplateElement.addEventListener('click', onDataSuccessButtonClick);
};

// Отображение формы отправки данных с ошибкой
const onSendError = () => {
  document.body.classList.remove('modal-open');
  const onDataErrorButtonKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeDataErrorForm(evt);
    }
  };

  document.body.appendChild(errorTemplateElement);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onDataErrorButtonKeyDown);

  const onDataErrorButtonClick = (evt) => {
    if (evt.target === errorTemplateElement || evt.target === errorButtonElement) {
      closeDataErrorForm(evt);
    }
  };

  function closeDataErrorForm() {
    errorTemplateElement.remove();
    document.removeEventListener('keydown', onDataErrorButtonKeyDown);
    document.addEventListener('keydown', onDocumentKeydown);
    errorTemplateElement.removeEventListener('click', onDataErrorButtonClick);
  }

  errorTemplateElement.addEventListener('click', onDataErrorButtonClick);
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
