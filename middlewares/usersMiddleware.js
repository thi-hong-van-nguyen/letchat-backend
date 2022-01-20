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

// async function checkUserExists(req, res, next) {
// 	const user = await User.findOne({ username: req.body.username });
// 	if (user) {
// 		next();
// 	} else {
// 		next({
// 			status: 404,
// 			message: 'User Not Found',
// 		});
// 	}
// }

module.exports = {
	checkUsernameTaken,
	checkEmailExists,
	// checkUserExists,
};
