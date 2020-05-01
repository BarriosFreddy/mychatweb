const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const UserService = require('./services/UserService');

const URL_DATABASE = 'mongodb://fbarrios:fbarrios7@ds121176.mlab.com:21176/heroku_vvf1zl9h';


mongoose.connect(URL_DATABASE, { useNewUrlParser: true });
const database = mongoose.connection;
database.once('open', _ => {
	console.log('Database connected')
});

database.on('error', err => {
	console.error('connection error:', err)
});

app.use(bodyParser.json());

app.get('/', (request, response) => {
	response.send('HI');
})

app.get('/users', (request, response) => {
	const user = {
		name: `User ${Math.random() * 100}`,
		password: "p$ss"
	};
	UserService.save(user)
		.then(response => console.log(response))
		.catch(error => console.error(error))
		.finally(() => response.redirect('/'));
})

app.listen(3000, () => console.log('listening on 3000'))

