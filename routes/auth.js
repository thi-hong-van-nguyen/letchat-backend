const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
	checkUsernameTaken,
	checkEmailExists,
} = require('../middlewares/usersMiddleware');

//REGISTER
router.post(
	'/register',
	checkUsernameTaken,
	checkEmailExists,
	async (req, res, next) => {
		try {
			//generate new password
			const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 4;
			const hash = bcrypt.hashSync(req.body.password, rounds);

			//create new user
			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: hash,
			});

			//save user and respond
			const user = await newUser.save();
			res.status(201).json({
				_id: user._id,
				username: user.username,
				email: user.email,
				profilePic: user.profilePic,
			});
		} catch (err) {
			next(err);
		}
	}
);

//LOGIN
router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(404).json('User not found');

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		!validPassword && res.status(400).json('Wrong password');

		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			profilePic: user.profilePic,
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
