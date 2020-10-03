require('dotenv').config();
const multer = require('multer');
const { resolve, join } = require('path');

const storage = multer.diskStorage({
  destination: join(resolve('src') + '/assets')
});

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
