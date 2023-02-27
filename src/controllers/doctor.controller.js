const Doctors = require("../models/doctor.model");


const createDoctor = async (req, res, next) => {
    try {
      const data = req.body;
      const doctor = new Doctors(data);
      const savedData = await doctor.save();
      res.status(201);
      res.send({ savedData });
    } catch (error) {
      next(error);
    }
  };

  module.exports = { createDoctor };