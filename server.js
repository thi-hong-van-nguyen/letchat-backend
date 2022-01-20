const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const server = express();
const port = process.env.PORT || 5000;

// middlewares
server.use(express.json());
server.use(cors());
server.use(helmet());

mongoose.connect(
	`${process.env.MONGO_URI}`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('MongoDB connected');
	}
);
server.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// routes
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

// endpoints
server.get('/', (req, res) => {
	res.status(200).send('hello from LETCHAT :)');
});

server.get('*', (req, res, next) => {
	next({
		status: 400,
		message: `this ${req.originalUrl} endpoint is not built yet!!`,
	});
});

// error handler
//eslint-disable-next-line
server.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		stack: err.stack,
		message: err.message,
	});
});

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
