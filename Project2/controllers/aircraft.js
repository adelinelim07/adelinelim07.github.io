const express = require('express');
const router = express.Router();

// Models
const Aircraft = require('../models/aircraft.js');
const AircraftSeed = require('../models/seed.js');
const Lessee = require('../models/lessee.js');


//seeding data
/*
Aircraft.create(AircraftSeed, (err,data)=>{
    if (err) console.log(err.message);
    console.log('added seed data');
});*/

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/aircraft')
    }
  }

//Get Route
router.get('/', (req, res)=>{
    Aircraft.find()
        .populate("lessee")
        .exec((error,allAircraft)=>{
            if (error) console.error(err.message);

            if(allAircraft){
                res.render('aircraft/index.ejs',{
                    aircraft: allAircraft,
                    currentUser: req.session.currentUser
            });
        }
    });
});

router.get('/signedin', isAuthenticated, (req, res)=>{
    Aircraft.find()
        .populate("lessee")
        .exec((error,allAircraft)=>{
            if (error) console.error(err.message);

            if(allAircraft){
                res.render('aircraft/signedin.ejs',{
                    aircraft: allAircraft,
                    currentUser: req.session.currentUser
            });
        };
    });
});
  
router.get('/new', (req, res)=>{
    Lessee.find({},(err, foundLessees)=>{
        res.render('aircraft/new.ejs', {
            lessees: foundLessees
        });
    })
});

router.post('/', (req, res)=>{
    Aircraft.create(req.body, (error, createdAircraft)=>{
        Lessee.findByIdAndUpdate(
            req.body.lessee, 
            {$push: {"aircraft": createdAircraft._id}},
            (err, updatedLessee) => {
                res.redirect('/aircraft/signedin'); 
            })
    
    });


});

router.delete('/:id', (req, res)=>{
    Aircraft.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/aircraft/signedin');//redirect back to main Aircraft page
    });
});

router.get('/:id/edit', (req, res)=>{
    Aircraft.findById(req.params.id, (err, foundAircraft)=>{ //find aircraft
        res.render(
    		'aircraft/edit.ejs',
    		{
    			aircraft: foundAircraft //pass in found aircraft
    		}
    	);
    });
});

router.get('/:id', (req, res)=>{
    Aircraft.findById(req.params.id, (err, foundAircraft)=>{
        res.render('aircraft/show.ejs', {
            aircraft: foundAircraft
        });
    });
});

router.put('/:id', (req, res)=>{
    Aircraft.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
        res.redirect('/aircraft/signedin');
    });
});

module.exports = router;