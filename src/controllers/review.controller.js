const Reviews = require("../models/review.model");

const createReview= async (req, res, next) => {
    try {
      const data = req.body;
      const review = new Reviews(data);
      const savedData = await review.save();
      res.status(201);
      res.send({ savedData });
    } catch (error) {
      next(error);
    }
  };

  module.exports = { createReview };