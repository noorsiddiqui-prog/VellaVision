const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  // firstName: { type: String, default: null },
  // lastName: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", authSchema);
