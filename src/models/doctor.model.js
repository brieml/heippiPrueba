const { hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");
const  {Schema}  = mongoose;

const doctorSchema = new Schema({
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  confirmation: { type: Boolean, default: false },
  name: String,
  adress: String,
  services: String,
  userType: { type: String, enum: ["HOSPITAL", "DOCTOR"], default: "HOSPITAL" },
});

doctorSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
  next();
});

doctorSchema.methods.toJSON = function () {
  const doc = this.toObject();
  delete doc.password;
  return doc;
};

doctorSchema.methods.verifyPassword = function (password) {
  return compare(password, this.password);
};

const Doctors = mongoose.model("Doctors", doctorSchema);

module.exports = Doctors;
