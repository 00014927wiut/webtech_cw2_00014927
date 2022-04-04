const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get('/interviews',isAuth,  adminController.getAllInterviews);
router.get('/share',isAuth , adminController.getShareExperience);
router.get('/share/:id',isAuth , adminController.getEditInterview);

router.post('/share', isAuth, adminController.postShareExperience);
router.post('/delete-interview', isAuth, adminController.deleteInterviewExperience);
router.post('/edit-interview', isAuth, adminController.postEditInterview);




module.exports = router;
