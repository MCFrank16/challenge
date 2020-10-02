const router = require('express').Router();

const { upload } = require('./middlewares/multer');
const {submitApplication, getApplications, getApplicationCV, updateStatus } = require('./handlers/applications');
const { createUser, loginUser, logout } = require('./handlers/auth');

router.post('/applications', upload, submitApplication);
router.get('/applications', getApplications);
router.get('/applications/:id/cv', getApplicationCV);
router.patch('/applications/:id/status', updateStatus)


// login routes
router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/logout', logout);

module.exports = router;
