const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
