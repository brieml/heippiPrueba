const { hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctors",
  },
  medicalObservation: String,
  healtStatus: String,
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  medicalSpeciality: { type: String, required: true },
});

reviewSchema.pre("save", async function (next) {
  next();
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
