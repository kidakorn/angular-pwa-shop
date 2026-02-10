const catchAsync = require('../utils/catchAsync')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = catchAsync(async (req, res, next) => {
	const { email, password, firstName, lastName, phoneNumber } = req.body;
	if (!email || !password) {
		return res.status(400).send('Please fill in all the blanks.');
	}

	const userCheck = await User.findOne({ email });
	if (userCheck) {
		return res.status(400).send('User already exists');
	}

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);

	const newUser = new User({
		email: email,
		password: hashPassword,
		firstName: firstName,
		lastName: lastName,
		phoneNumber: phoneNumber,
	});

	await newUser.save();
	res.json({ msg: 'Register Success' });
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const userCheck = await User.findOne({ email });
	if (!userCheck) {
		return res.status(400).send('Email is not valid!');
	}

	const isMatch = await bcrypt.compare(password, userCheck.password);
	if (!isMatch) {
		return res.status(400).send('Password is not valid!');
	}

	const payload = {
		user: {
			id: userCheck._id,
			name: userCheck.firstName,
			role: userCheck.role
		}
	};

	const token = jwt.sign(payload, 'Secrect token', { expiresIn: '15m' }, (err, token) => {
		if (err) throw err;
		res.json({ token, payload });
	});
});

module.exports = { register, login };

