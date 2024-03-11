import { processPosts } from './generate-posts.js';
import { setPosts } from './generate-state.js';
import { processThumbnails } from './generate-thumbnails.js';
import { processUpload } from './generate-upload-form.js';
import { processScale } from './generate-scale.js';
import { processSlider } from './generate-slider.js';

const posts = processPosts();
setPosts(posts);
processThumbnails();
processUpload();
processScale();
processSlider();
