import { createPictures } from './picture-data.js';
import { setPictures } from './picture-state.js';
import { pictureThumbnails } from './picture-thumbnails.js';
import { processUpload } from './upload-form.js';

const pictures = createPictures();
setPictures(pictures);
pictureThumbnails();
processUpload();
