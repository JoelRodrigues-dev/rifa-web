const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  purchasedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", TicketSchema);
