const express = require("express");
const { createDoctor } = require("../../controllers/doctor.controller");
const { createReview } = require("../../controllers/review.controller");
const {
  createUser,
  validateAccount,
  signIn,
  userInfo,
  id,
  changePass,
} = require("../../controllers/user.controller");
const { auth } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.route("/validateAccount").post(validateAccount);

router.route("/signIn").post(signIn);

router.route("/signUp").post(createUser);

router.param("id",id)

router.route("/userInfo/:id").put(auth,userInfo);

router.route("/changePass/:id").put(auth,changePass);

router.route("/doctorSingUp").post(createDoctor);

router.route("/medicalObservations").post(createReview);



module.exports = router;
