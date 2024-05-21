const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const userRoutes = require("./routes/user");
const hotelRoutes = require("./routes/hotel");
const transactionRoutes = require("./routes/transaction");
const roomRoutes = require("./routes/room");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRoutes.route);
app.use(hotelRoutes.route);
app.use(transactionRoutes.route);
app.use(roomRoutes.route);

mongoose
  .connect(
    "mongodb+srv://viet:tom123@cluster0.owuikit.mongodb.net/asm2?retryWrites=true"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(5000);
  })
  .catch((err) => console.log("Error:", err));
