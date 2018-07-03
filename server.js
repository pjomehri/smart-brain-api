const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'P@ssw0rd1',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

//================ End points ==========================

app.get('/', (req, res) => {
	db.select('*').from('users').then(data => {
		res.json(data);
	});
})
// signin function is returning another function
app.post('/signin', signin.handleSignin(db, bcrypt))
// dependency injection for db and bcrypt
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
	console.log('app running at port 3000');
})


// const database = {
// 	users: [
// 		{
// 			id: '124',
// 			name: 'Mr.Monster',
// 			email: 'monsti@scarystuff.com',
// 			password: 'pass1',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '122',
// 			name: 'Tiny Overlord',
// 			email: 'Tiny@Overlord.org',
// 			password: 'pass2',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	]
// }