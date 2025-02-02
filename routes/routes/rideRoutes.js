const express = require("express");
const Ride = require("../models/Ride");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { driver, startLocation, endLocation, price } = req.body;
  const ride = new Ride({ driver, startLocation, endLocation, price });
  await ride.save();
  
  res.json({ message: "Ride created successfully" });
});

router.get("/available", async (req, res) => {
  const rides = await Ride.find({ status: "Available" }).populate("driver");
  res.json(rides);
});

router.post("/book/:id", async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) return res.status(404).json({ message: "Ride not found" });

  ride.status = "Booked";
  ride.passengers.push(req.body.passengerId);
  await ride.save();

  res.json({ message: "Ride booked successfully" });
});

module.exports = router;
