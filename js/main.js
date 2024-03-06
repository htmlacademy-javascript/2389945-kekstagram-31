import { createPosts } from './generate-posts.js';
import { createThumbnails } from './generate-thumbnails.js';
import { setPosts } from './generate-state.js';

const posts = createPosts();
setPosts(posts);
createThumbnails();
