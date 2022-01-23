const router = require('express').Router();
const Conversation = require('../models/Conversation');

// get all Conversations
router.get('/', async (req, res, next) => {
	try {
		const conversations = await Conversation.find();
		res.status(200).json(conversations);
	} catch {
		(err) => next(err);
	}
});

// new Conversation
router.post('/', async (req, res, next) => {
	try {
		const newConv = new Conversation({
			members: [req.body.senderId, req.body.receiverId],
		});
		const savedConv = await newConv.save();
		res.status(201).json(savedConv);
	} catch {
		(err) => next(err);
	}
});

// get conv of a user
router.get('/:userId', async (req, res, next) => {
	try {
		const conv = await Conversation.find({
			members: { $in: [req.params.userId] },
		});
		res.status(200).json(conv);
	} catch {
		(err) => next(err);
	}
});

module.exports = router;
