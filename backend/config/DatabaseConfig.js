const mongoose = require('mongoose');
const Constants = require('./../constants/Constants');

module.exports = () => {
	mongoose.connect(Constants.URL_DATABASE, { useNewUrlParser: true, useCreateIndex: true, });
	const database = mongoose.connection;

	database.once('open', () => console.log('Database connected'));
	database.on('error', error => console.error('Connection error:', error));
	return database;
}