const router = require('express').Router();

const { upload } = require('./middlewares/multer');
const {submitApplication, getApplications, getApplicationCV, updateStatus } = require('./handlers/applications');

router.post('/applications', upload, submitApplication);
router.get('/applications', getApplications);
router.get('/applications/:id/cv', getApplicationCV);
router.patch('/applications/:id/status', updateStatus)


module.exports = router;