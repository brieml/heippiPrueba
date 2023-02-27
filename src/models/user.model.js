const { hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  confirmation: { type: Boolean, default: false },
  name: String,
  adress: String,
  services: String,
  birthDate: String,
  userType: { type: String, enum: ["HOSPITAL", "PATIENT"], default: "PATIENT" },
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
  next();
});

userSchema.methods.toJSON = function () {
    const doc = this.toObject();
    delete doc.password;
    return doc;
};

userSchema.methods.verifyPassword = function (password){
    return compare(password,this.password)
}

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
