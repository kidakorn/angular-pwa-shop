const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/admin-test', auth, adminCheck, catchAsync(async (req, res) => {
	res.json({ msg: 'Welcome to Admin-devashop!', payload: { user: req.user } });
}));

router.get('/current-user', auth, catchAsync(async (req, res) => {
	res.json({ payload: { user: req.user } });
}));

module.exports = router;