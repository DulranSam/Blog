const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const cors = require("cors");
const mongoose = require("mongoose");
const home = require("./routes/home");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
app.use("/home", home);

async function connect() {
  await mongoose.connect(cluster, { useNewUrlParser: true });
  app.listen(port, console.log(`Servers up on port ${port}`));
}

connect();
