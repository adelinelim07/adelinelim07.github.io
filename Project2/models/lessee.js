const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lesseeSchema = mongoose.Schema({
  name: String,
  credit_rating: { type: Number, minimum: 1, maximum: 9 },
  country: String,
  aircraft: [{ type: Schema.Types.ObjectId, ref:"Aircraft" }]
});

const Lessee = mongoose.model("Lessee", lesseeSchema);

module.exports = Lessee;