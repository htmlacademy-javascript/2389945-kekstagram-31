import { createPictures } from './picture-data.js';
import { setPictures } from './picture-state.js';
import { createPictureThumbnails } from './picture-thumbnails.js';
import { createUploadForm } from './upload-form.js';

const pictures = createPictures();
setPictures(pictures);
createPictureThumbnails();
createUploadForm();
