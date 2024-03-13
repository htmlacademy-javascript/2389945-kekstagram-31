import { processPosts } from './picture-data.js';
import { setPosts } from './picture-state.js';
import { processThumbnails } from './picture-thumbnails.js';
import { processUpload } from './upload-form.js';

const posts = processPosts();
setPosts(posts);
processThumbnails();
processUpload();
