import { createPosts } from './create-posts.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const posts = createPosts();

const createThumbnails = () => {
  for (let i = 0; i < posts.length; i++) {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = posts[i].url;
    newPicture.querySelector('.picture__img').alt = posts[i].description;
    newPicture.querySelector('.picture__likes').textContent = posts[i].likes;
    newPicture.querySelector('.picture__comments').textContent =
      posts[i].comments.length;

    fragment.appendChild(newPicture);
  }
  pictures.appendChild(fragment);
  // eslint-disable-next-line no-console
  // console.log(pictures);
};

export { createThumbnails };
