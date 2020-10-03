const router = require('express').Router();

const { upload } = require('./middlewares/multer');
const {submitApplication, getApplications, getApplicationCV, updateStatus, removeApplication } = require('./handlers/applications');
const { createUser, loginUser, logout } = require('./handlers/auth');

router.post('/applications', upload, submitApplication);
router.get('/applications', getApplications);
router.get('/applications/:id/cv', getApplicationCV);
router.get('/applications/:id', updateStatus);
router.delete('/applications/:id', removeApplication);


// login routes
router.post('/signup', createUser);
router.post('/signin', loginUser);
router.get('/logout', logout);

module.exports = router;
