const mongoose = require('mongoose');// require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// https://mongoosejs.com/docs/guide.html

// as at Date?! how to keep it in
const aircraftSchema = new Schema({
    msn: { type: Number, required: true, unique: true},
    aircraft: {
        aircraft_model: { type: String, required: true, enum: ['B737-700','B737-800','A320-200','A321-200','B737-Max8','A320neo','A321neo']},
        engine_model: { type: String, enum: ['PW','IAE','CFM']},
        esn1: String,
        esn2: String, 
        esn3: String, 
        esn4: String, 
        manufactured_date: Date
    },
    lease: {
        status: { type: String, enum: ['Delivered','Committed','Sold']},
        sub_status: { type: String, enum: ['Delivered','LOI Sales','SPA Signed','LOI','LA Signed','Sold']},
    },
    lessee: { type: Schema.Types.ObjectId, ref:"Lessee" },
    accounting: {
        nbv: Number
    }
  }, {timestamps: true});


// Model's are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database
// from here: https://mongoosejs.com/docs/models.html
const Aircraft = mongoose.model('Aircraft', aircraftSchema);

//make this exportable to be accessed in `app.js`
module.exports = Aircraft;