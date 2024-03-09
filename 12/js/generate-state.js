const postState = {
  posts: null,
  currentOpenedPost: null,
  currentOpenedComments: 0,
};

const setCurrentOpenedPost = (value) => {
  postState.currentOpenedPost = value;
};

const getCurrentOpenedPost = () => postState.currentOpenedPost;

const setPosts = (posts) => {
  postState.posts = posts;
};

const setCurrentOpenedComments = (count) => {
  postState.currentOpenedComments = count;
};

const getCurrentOpenedComments = () => postState.currentOpenedComments;

const getPostById = function (id) {
  return postState.posts.find((el) => el.id === id);
};
const getCommentsFromCurrentPost = () => {
  const currentPost = getPostById(getCurrentOpenedPost());
  return currentPost.comments;
};

const getCurrentTotalComments = () => getCommentsFromCurrentPost().length;

const clearState = () => {
  postState.currentOpenedComments = 0;
  postState.currentOpenedPost = null;
};

export {
  clearState,
  getCommentsFromCurrentPost,
  getCurrentOpenedComments,
  getCurrentOpenedPost,
  getCurrentTotalComments,
  getPostById,
  postState,
  setCurrentOpenedComments,
  setCurrentOpenedPost,
  setPosts,
};
