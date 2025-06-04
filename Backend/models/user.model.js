const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email : {type: String, unique: true, required: true},
  password: { type: String, required: true },
  resetToken: {type: String},
  resetTokenExpiry: {type: Date},
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;