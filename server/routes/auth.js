const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/admin-test', auth, adminCheck, catchAsync(async (req, res) => {
	res.json({ msg: 'Welcome to Admin-devashop!', user: req.user });
}));

router.post('/current-user', auth, catchAsync(async (req, res) => {
	res.json({ msg: 'Welcome to Devashop!', user: req.user });
}));

module.exports = router;