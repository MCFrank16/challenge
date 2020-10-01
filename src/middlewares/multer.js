require('dotenv').config();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../assets')
});

const errorMessage = 'unsupported file format, we accept only jpg,jpeg,png and pdf.';

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' ||
  file.mimetype === 'image/png' ||
  file.mimetype === 'image/jpg' ||
  file.mimetype === 'application/pdf') {
    return cb(null, true);
  }
  req.errorFile = errorMessage;
  return cb();
};


const upload = multer({ storage, fileFilter }).single('file');

module.exports = {
    upload,
    errorMessage
};
