const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/',  userController.getIndex);
router.get('/interview/:id',  userController.getDetail);

module.exports = router;
