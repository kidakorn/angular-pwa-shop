module.exports = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json ({
		status: 'error',
		msg: err.message || 'Something went wrong!',
	});
};