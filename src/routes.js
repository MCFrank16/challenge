const router = require('express').Router();

const { upload } = require('./middlewares/multer');
const {submitApplication, getApplications, getApplicationCV, updateStatus } = require('./handlers/applications');
const { loginUser, logout } = require('./handlers/auth');

router.post('/applications', upload, submitApplication);
router.get('/applications', getApplications);
router.get('/applications/:id/cv', getApplicationCV);
router.get('/applications/:id', updateStatus)


// login routes
router.post('/signin', loginUser);
router.get('/logout', logout);

module.exports = router;
