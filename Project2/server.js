//dependencies
const express = require('express');
//const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()

//middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false
// }))

// Config
const mongoURI = 'mongodb://localhost:27017/portfolio';

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => { 
    console.log('Mongo running at', mongoURI)
});
// Error / success
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

//use controllers and routes
const portfolioController = require('./controllers/portfolio.js');
app.use('/portfolio',portfolioController);

// const userController = require('./controllers/users.js');
// app.use('/users', userController);

// const sessionsController = require('./controllers/sessions.js')
// app.use('/sessions', sessionsController);

app.use(express.static('public'));


// Welcome route
/*
app.get('/', (req, res) => {
    res.render('index.ejs', {
      currentUser: req.session.currentUser
    })
  })
*/

app.listen(3000, ()=>{
    console.log('listening');
});
