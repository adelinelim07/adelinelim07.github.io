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

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

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
const portfolioController = require('./controllers/portfolio.js');
app.use('/portfolio',portfolioController);

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

app.get('/portfolio', (req, res) => {
  res.render('/portfolio/index.ejs', {
      currentUser: req.session.currentUser
  })
})

app.get('/portfolio/signedin', isAuthenticated, (req, res)=>{
  res.render('app/index.ejs', {
    currentUser: req.session.currentUser
  })
})

// Listen
app.listen(PORT, () => console.log('auth happening on port', PORT))
