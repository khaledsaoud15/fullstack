const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");

app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/products", productRoute);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
