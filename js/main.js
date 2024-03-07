import { createPosts } from './generate-posts.js';
import { setPosts } from './generate-state.js';
import { createThumbnails } from './generate-thumbnails.js';
import { processUpload } from './generate-upload-form.js';

const posts = createPosts();
setPosts(posts);
createThumbnails();
processUpload();
