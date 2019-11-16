const express = require("express");
const router = express.Router();
const Lessee = require("../models/lessee.js");

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
              res.render('lessee/index.ejs',{
                  lessee: allLessee,
                  currentUser: req.session.currentUser
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
              res.render('lessee/signedin.ejs',{
                  lessee: allLessee,
                  currentUser: req.session.currentUser
          });
      }
  });
});


router.get("/new", (req, res) => {
  res.render("lessee/new.ejs");
});

//...
//...farther down the page
router.post("/", (req, res) => {
  Lessee.create(req.body, (err, createdLessee) => {
    res.redirect("/lessee");
  });
});

router.delete("/:id", (req, res) => {
  Lessee.findByIdAndRemove(req.params.id, () => {
    res.redirect("/lessee");
  });
});

router.get("/:id/edit", (req, res) => {
  Lessee.findById(req.params.id, (err, foundLessee) => {
    res.render("lessee/edit.ejs", {
      Lessee: foundLessee
    });
  });
});

router.put("/:id", (req, res) => {
  Lessee.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/lessee");
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