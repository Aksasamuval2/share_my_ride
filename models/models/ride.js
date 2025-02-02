const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["Available", "Booked", "Completed"], default: "Available" }
});

module.exports = mongoose.model("Ride", RideSchema);
