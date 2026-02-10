const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/current-user', auth, catchAsync(async (req, res) => {
	res.json({ msg: 'Welcome to Devashop!', user: req.user });
}));

module.exports = router;