import { openPicture } from './picture-comments.js';
import { postState } from './picture-state.js';
import { fragment, pictureTemplate, pictures } from './dom-elements.js';

// Создание миниатюр фотографий
const processThumbnails = () => {
  postState.posts.forEach((post) => {
    const newPicture = pictureTemplate.cloneNode(true);
    const pictureImg = newPicture.querySelector('.picture__img');
    pictureImg.id = post.id;
    pictureImg.src = post.url;
    pictureImg.alt = post.description;
    newPicture.querySelector('.picture__likes').textContent = post.likes;
    newPicture.querySelector('.picture__comments').textContent =
      post.comments.length;
    fragment.appendChild(newPicture);
  });
  pictures.appendChild(fragment);
};

// Обработчик события клика на миниатюре фотографии
pictures.addEventListener('click', (evt) => {
  const id = evt.target.id;
  if (postState.posts.some((post) => post.id === +id)) {
    openPicture(id);
  }
});

export { processThumbnails };
