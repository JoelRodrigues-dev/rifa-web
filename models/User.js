const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ci: { type: String, required: true, unique: true },
  birthDate: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, require: true },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
});

module.exports = mongoose.model("User", UserSchema);
