import { DATA_URL, ERROR_SHOW_TIME, Router, Method } from './config.js';
import { dataError } from './dom-elements.js';

const dataErrorTemplate = dataError.cloneNode(true);
const dataErrorTitle = dataErrorTemplate.querySelector('.data-error__title');
dataErrorTemplate.classList.add('hidden');
document.body.appendChild(dataErrorTemplate);

const showError = (errorText) => {
  dataErrorTitle.textContent = errorText;
  dataErrorTemplate.classList.remove('hidden');
  setTimeout(() => {
    dataErrorTemplate.classList.add('hidden');
  }, ERROR_SHOW_TIME);
};

const sendRequest = function (router, method, errorText, body = null) {
  return fetch(`${DATA_URL}${router}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });
};

const getServerData = function () {
  return sendRequest(
    Router.GET_DATA,
    Method.GET,
    'Ошибка загрузки данных. Обновите страницу позднее'
  );
};

const sendServerData = function (body) {
  return sendRequest(
    Router.SEND_DATA,
    Method.POST,
    'Ошибка отправки данных. Обновите страницу позднее',
    body
  );
};

export { getServerData, sendServerData, showError };
