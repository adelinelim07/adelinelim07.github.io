const mongoose = require("mongoose");

const lesseeSchema = mongoose.Schema({
  name: String,
  credit_rating: { type: Number, minimum: 1, maximum: 9 },
  country: String
});

const Lessee = mongoose.model("Lessee", lesseeSchema);

module.exports = Lessee;