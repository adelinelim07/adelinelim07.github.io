const express = require("express");
const router = express.Router();
const Lessee = require("../models/lessee.js");
const Aircraft = require("../models/aircraft.js");

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/lessee')
  }
}

//Get Route
router.get('/', (req, res)=>{
  Lessee.find()
      .populate("aircraft")
      .exec((error,allLessee)=>{
          if (error) console.error(err.message);

          if(allLessee){
            Aircraft.find({},(err,allAircraft)=>{
              res.render('lessee/index.ejs',{
                  lessee: allLessee,
                  aircraft: allAircraft,
                  currentUser: req.session.currentUser
            })
          });
      }
  });
});


router.get('/signedin', isAuthenticated, (req, res)=>{
  Lessee.find()
      .populate("aircraft")
      .exec((error,allLessee)=>{
          if (error) console.error(err.message);

          if(allLessee){
            Aircraft.find({},(err,allAircraft)=>{
              res.render('lessee/signedin.ejs',{
                  lessee: allLessee,
                  aircraft: allAircraft,
                  currentUser: req.session.currentUser
              })
          });
      }
  });
});


router.get("/new", (req, res) => {
  res.render("lessee/new.ejs");
});


router.post("/", (req, res) => {
  Lessee.create(req.body, (err, createdLessee) => {
    res.redirect("/lessee/signedin");
  });
});


router.delete("/:id", (req, res) => {
  Lessee.findByIdAndRemove(req.params.id, () => {
    res.redirect("/lessee/signedin");
  });
});

router.get("/:id/edit", (req, res) => {
  Lessee.findById(req.params.id, (err, foundLessee) => {
    res.render("lessee/edit.ejs", {
      lessee: foundLessee
    });
  });
});

router.put("/:id", (req, res) => {
  Lessee.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/lessee/signedin");
  });
});

//avoid this handling /new by placing it towards the bottom of the file
router.get("/:id", (req, res) => {
  Lessee.findById(req.params.id, (err, foundLessee) => {
    res.render("lessee/show.ejs", {
      lessee: foundLessee
    });
  });
});

module.exports = router;