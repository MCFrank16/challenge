require('dotenv').config();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    return cb(null, true);
  }
  return cb();
};


const upload = multer({ storage, fileFilter }).single('file');

module.exports = {
    upload
};
