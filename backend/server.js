const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/user.route");

app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();

app.use("/api/v1/", userRoute);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
