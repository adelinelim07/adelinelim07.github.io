// Dependencies
const mongoose = require('mongoose');
const db = mongoose.connection;

// Config
const mongoURI = 'mongodb://localhost:27017/portfolio';

// Models
const Portfolio = require('./models/aircraft.js');
const PortfolioSeed = require('./models/seed.js');

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => { 
    console.log('Mongo running at', mongoURI)
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

//Seed data
/*
Portfolio.create(PortfolioSeed, (err, data) => {
   if (err) console.log(err.message)
   console.log('added seed portfolio data')
});
*/
