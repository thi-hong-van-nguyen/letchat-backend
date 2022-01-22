const router = require('express').Router();
const User = require('../models/User');
const {
	checkAvailableUsername,
	checkAvailableEmail,
} = require('../middlewares/usersMiddleware');

router.get('/', async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch {
		(err) => next(err);
	}
});

router.get('/:_id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params._id);
		res.status(200).json(user);
	} catch {
		(err) => next(err);
	}
});

router.put(
	'/:_id',
	checkAvailableUsername,
	checkAvailableEmail,
	async (req, res, next) => {
		try {
			const { _id } = req.params;
			const { username, email, profilePic } = req.body;

			await User.findOneAndUpdate(
				{ _id: _id },
				{ $set: { username: username, email: email, profilePic: profilePic } }
			);
			const updatedUser = await User.findById(_id);
			res.status(200).json(updatedUser);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
