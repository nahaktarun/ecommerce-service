const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
app.use(morgan("dev"));
connectDB()
app.get("/", (req, res) => {
  res.send("E-commerce service backend is running....");
});
app.listen(3000, () => {
  console.log("`Server listening to the port 3000.");
});
