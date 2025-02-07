const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    image: String,
    phone: String,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
