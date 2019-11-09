const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const portfolioController = require('./controllers/portfolio.js');

const app = express();

//middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));

//use controllers and routes
app.use('/portfolio',portfolioController);

app.use(express.static('public'));

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


app.listen(3000, ()=>{
    console.log('listening');
});
