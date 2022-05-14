const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();

const host = "localhost";
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Doctors Portal Server is Running");
});

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
