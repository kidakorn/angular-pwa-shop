const express = require('express');
const router = express.Router();
const { createImage, removeImage } = require('../controllers/cloudinary');
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

router.post('/images', auth, adminCheck, createImage);
router.post('/removeimage', auth, adminCheck, removeImage);

module.exports = router;