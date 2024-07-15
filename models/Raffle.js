const mongoose = require("mongoose");

const RaffleSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  pricePerQuota: { type: String, required: true },
  raffleDate: { type: Date, required: true },
  totalQuota: { type: Number, required: true },
  soldQuota: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model("Raffle", RaffleSchema);
