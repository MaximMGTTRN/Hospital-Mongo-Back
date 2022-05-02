const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./src/modules/routers/user.routes.js");
const appointmentRoutes = require("./src/modules/routers/appointment.routes.js");

app.use(cors());

const uri = "mongodb+srv://Max:bushuev123321@cluster0.whymf.mongodb.net/test";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use("/", userRoutes);
app.use("/", appointmentRoutes);

app.listen(8000, () => {
  console.log("8000 port is listening");
});
