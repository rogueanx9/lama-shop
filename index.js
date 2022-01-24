const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

//App Listen
const backendConnect = () => {
  app.listen(PORT, () => {
    console.log(`Backend running on ${PORT}...`);
  });
};

//Mongoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.ATLAS_URI)
  .then(backendConnect)
  .catch((err) => console.log(err));

//Middlewares
app.use(express.json());
app.use(cors());

//Router
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/stripe", stripeRoute);

//API Check
app.get("/", (req, res) => {
  res.status(200).send("It Works");
});
