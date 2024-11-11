import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  //   destination: function (req, file, callBack) {
  //     callBack(null, TEMP_UPLOAD_DIR);
  //     },
  destination: TEMP_UPLOAD_DIR,
  filename: function (req, file, callBack) {
    const filename = `${Date.now()}_${file.originalname}`;
    callBack(null, filename);
  },
});

export const upload = multer({ storage });
