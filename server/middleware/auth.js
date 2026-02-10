const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

	const authHeader = req.headers.authorization;

	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	jwt.verify(token, 'Secrect token', (err, decoded) => {
		if (err) {
			return res.status(401).json({ msg: 'Token is not valid' });
		}
		req.user = decoded.user;
		next();
	})

};