const User = require('../models/User');

async function checkUsernameTaken(req, res, next) {
	const user = await User.findOne({ username: req.body.username });
	if (user) {
		next({
			status: 400,
			message: 'Username taken',
		});
	} else {
		next();
	}
}

async function checkEmailExists(req, res, next) {
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		next({
			status: 400,
			message: 'Email already in use',
		});
	} else {
		next();
	}
}

async function checkAvailableUsername(req, res, next) {
	const user = await User.findOne({ username: req.body.username });
	if (!user) {
		next();
	} else {
		if (user._id.toString() === req.params._id) {
			next();
		} else {
			next({
				status: 400,
				message: 'Username taken',
			});
		}
	}
}

async function checkAvailableEmail(req, res, next) {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		next();
	} else {
		if (user._id.toString() === req.params._id) {
			next();
		} else {
			next({
				status: 400,
				message: 'Email is already in use',
			});
		}
	}
}

module.exports = {
	checkUsernameTaken,
	checkEmailExists,
	// checkUserExists,
	checkAvailableUsername,
	checkAvailableEmail,
};
