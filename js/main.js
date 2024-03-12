import { processPosts } from './generate-posts.js';
import { setPosts } from './generate-state.js';
import { processThumbnails } from './generate-thumbnails.js';
import { processUpload } from './generate-upload-form.js';

const posts = processPosts();
setPosts(posts);
processThumbnails();
processUpload();
