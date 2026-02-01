const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");

const app = express();
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch(console.error);

const { PORT = 3001 } = process.env;
console.log(`connected to port ${PORT}`);
app.use(express.json());

app.use("/", indexRouter);
app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {});
