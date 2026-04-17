import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const imagesDir = 'public/images';

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, {recursive: true});
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, imagesDir);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileName = crypto.randomUUID() + extension;
    cb(null, fileName);
  },
});

const imagesUpload = multer({storage});

export default imagesUpload;