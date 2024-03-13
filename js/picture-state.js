// Объект для хранения общего пула постов с текущим состоянием выбранного поста
const postState = {
  posts: null,
  currentOpenedPost: null,
  currentOpenedComments: 0,
};

// Инициализация пула постов
const setPosts = (posts) => {
  postState.posts = posts;
};

// Установить текущий выбранный пост
const setCurrentOpenedPost = (value) => {
  postState.currentOpenedPost = value;
};

// Получить текущий выбранный пост
const getCurrentOpenedPost = () => postState.currentOpenedPost;

// Установить количество открытых (просмотренных) комментариев
const setCurrentOpenedComments = (count) => {
  postState.currentOpenedComments = count;
};

// Получить количество открытых (просмотренных) комментариев
const getCurrentOpenedComments = () => postState.currentOpenedComments;

// Получить пост по id
const getPostById = function (id) {
  return postState.posts.find((el) => el.id === id);
};

// Получить массив комментариев текущего открытого поста
const getCommentsFromCurrentPost = () =>
  getPostById(getCurrentOpenedPost()).comments;

// Получить общее количество комментариев текущего открытого поста
const getCurrentTotalComments = () => getCommentsFromCurrentPost().length;

// Сбросить состояние текущего отерытого поста
const clearPostState = () => {
  postState.currentOpenedComments = 0;
  postState.currentOpenedPost = null;
};

export {
  postState,
  setPosts,
  getCommentsFromCurrentPost,
  getCurrentOpenedComments,
  getCurrentOpenedPost,
  getCurrentTotalComments,
  getPostById,
  setCurrentOpenedComments,
  setCurrentOpenedPost,
  clearPostState,
};
