const router = require('express').Router();
const Message = require('../models/Message');

// add
router.post('/', async (req, res, next) => {
	try {
		const newMsg = new Message(req.body);
		const savedMsg = await newMsg.save();
		res.status(200).send(savedMsg);
	} catch {
		(err) => next(err);
	}
});

router.get('/:conversationId', async (req, res, next) => {
	try {
		const messages = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json(messages);
	} catch {
		(err) => next(err);
	}
});

module.exports = router;
