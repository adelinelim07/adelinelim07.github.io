const mongoose = require("mongoose");

const lesseeSchema = mongoose.Schema({
  name: String,
  credit_raing: { type: Number, minimum: 1, maximum: 9 },
  country_incorporated: String
});

const Lessee = mongoose.model("Lessee", lesseeSchema);

module.exports = Lessee;