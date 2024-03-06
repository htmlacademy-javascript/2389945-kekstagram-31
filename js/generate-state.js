const state = {
  posts: null,
  currentOpenedPost: null,
  currentOpenedComments: 0,
};

const setCurrentOpenedPost = (value) => {
  state.currentOpenedPost = value;
};

const getCurrentOpenedPost = () =>
  state.currentOpenedPost;

const setPosts = (posts) => {
  state.posts = posts;
};

const setCurrentOpenedComments = (count) => {
  state.currentOpenedComments = count;
};

const getPostById = (id) => state.posts.find((el) => el.id === id);
const getCommentsFromCurrentPost = () => {
  const currentPost = getPostById(state.currentOpenedPost);
  return currentPost.comments;
};

const clearState = () => {
  state.currentOpenedComments = 0;
  state.currentOpenedPost = null;
};

export {
  state,
  setCurrentOpenedComments,
  getCurrentOpenedPost,
  setPosts,
  setCurrentOpenedPost,
  getPostById,
  getCommentsFromCurrentPost,
  clearState,
};
