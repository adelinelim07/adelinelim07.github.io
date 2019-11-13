const express = require('express');
const router = express.Router();

// Models
const Portfolio = require('../models/aircraft.js');
const PortfolioSeed = require('../models/seed.js');


//seeding data
/*
Portfolio.create(PortfolioSeed, (err,data)=>{
    if (err) console.log(err.message);
    console.log('added seed data');
});*/


//Get Route
router.get('/', (req, res)=>{
    Portfolio.find({},(error,allAircraft)=>{
        res.render('index.ejs',{
            aircraft: allAircraft,
            currentUser: req.session.currentUser
        });
    });
});

router.get('/new', (req, res)=>{
    res.render('new.ejs');
});

router.post('/', (req, res)=>{
    Portfolio.create(req.body, (error, createdAircraft)=>{
       res.redirect('/portfolio'); 
    });
});

router.delete('/:id', (req, res)=>{
    Portfolio.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/portfolio');//redirect back to main portfolio page
    });
});

router.get('/:id/edit', (req, res)=>{
    Portfolio.findById(req.params.id, (err, foundAircraft)=>{ //find aircraft
        res.render(
    		'edit.ejs',
    		{
    			aircraft: foundAircraft //pass in found aircraft
    		}
    	);
    });
});

router.get('/:id', (req, res)=>{
    Portfolio.findById(req.params.id, (err, foundAircraft)=>{
        res.render('show.ejs', {
            aircraft: foundAircraft
        });
    });
});

router.put('/:id', (req, res)=>{
    Portfolio.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
        res.redirect('/portfolio');
    });
});

module.exports = router;