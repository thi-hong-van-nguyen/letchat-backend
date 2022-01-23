const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true,
			min: 1,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			min: 1,
		},
		profilePic: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
