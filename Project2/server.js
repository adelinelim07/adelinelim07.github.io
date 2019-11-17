//dependencies
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()

//middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// Configuration
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

//use controllers and routes
const aircraftController = require('./controllers/aircraft.js');
app.use('/aircraft',aircraftController);

const userController = require('./controllers/users.js');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController);

const lesseeController = require('./controllers/lessee.js')
app.use('/lessee', lesseeController);

app.use(express.static('public'));

//routes
app.get('/account', (req, res) => {
  res.render('account/index.ejs', {
    currentUser: req.session.currentUser
  })
})

app.get('/aircraft', (req, res) => {
  res.render('aircraft/index.ejs', {
      currentUser: req.session.currentUser
  })
})

app.get('/dailies', (req,res)=> {
  res.render('dailies/index.ejs')
})

app.get('/fx', (req,res)=> {
  res.render('fx/index.ejs')
})

// Listen
app.listen(PORT, () => console.log('auth happening on port', PORT))
