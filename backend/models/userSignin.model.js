const mongoose = require("mongoose");

const userSignInSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  signInDate: { type: Date, default: Date.now }, // Store each sign-in event
});

module.exports = mongoose.model("UserSignIn", userSignInSchema);
