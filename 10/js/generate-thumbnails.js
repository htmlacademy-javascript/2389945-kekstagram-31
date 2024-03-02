import { openPicture } from './generate-picture.js';
import { createPosts } from './generate-posts.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const posts = createPosts();

// Создание миниатюр фотографий
const createThumbnails = () => {
  posts.forEach((post, index) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('a').id = index;
    newPicture.querySelector('.picture__img').src = post.url;
    newPicture.querySelector('.picture__img').alt = post.description;
    newPicture.querySelector('.picture__likes').textContent = post.likes;
    newPicture.querySelector('.picture__comments').textContent =
      post.comments.length;
    fragment.appendChild(newPicture);
  });
  pictures.appendChild(fragment);
};

// Обработчик события клика на миниатюре фотографии
pictures.addEventListener('click', (evt) => {
  const id = evt.target.parentElement.id;
  evt.preventDefault();
  openPicture(posts[id]);
});

export { createThumbnails };
