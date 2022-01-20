const router = require('express').Router();
const User = require('../models/User');

router.put('/:id/profilePic', async (req, res, next) => {
	try {
		const { id } = req.params;
		await User.updateOne(
			{ _id: id },
			{ $set: { profilePic: req.body.profilePic } }
		);
		const updatedUser = await User.findById(id);
		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
