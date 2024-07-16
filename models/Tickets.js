const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  raffle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Raffle",
    required: true,
  },
  purchasedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", TicketSchema);
