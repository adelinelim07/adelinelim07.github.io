//imports express module & initializes express
const express = require('express');
const app = express();
//include the method-override package
const methodOverride = require('method-override');
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
app.use(express.static('public'));
//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

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

//Get Route
app.get('/portfolio', (req, res)=>{
    Portfolio.find({},(error,allAircraft)=>{
        res.render('index.ejs',{
            aircraft: allAircraft
        });
    });
});

app.get('/portfolio/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/portfolio/', (req, res)=>{
    Portfolio.create(req.body, (error, createdAircraft)=>{
       res.redirect('/portfolio'); 
    });
});

app.delete('/portfolio/:id', (req, res)=>{
    Portfolio.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/portfolio');//redirect back to main portfolio page
    });
});

app.get('/portfolio/:id/edit', (req, res)=>{
    Portfolio.findById(req.params.id, (err, foundAircraft)=>{ //find aircraft
        res.render(
    		'edit.ejs',
    		{
    			aircraft: foundAircraft //pass in found aircraft
    		}
    	);
    });
});

app.get('/portfolio/:id', (req, res)=>{
    Portfolio.findById(req.params.id, (err, foundAircraft)=>{
        res.render('show.ejs', {
            aircraft: foundAircraft
        });
    });
});

app.put('/portfolio/:id', (req, res)=>{
    Portfolio.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
        res.redirect('/portfolio');
    });
});

app.listen(3000, ()=>{
    console.log('listening');
});