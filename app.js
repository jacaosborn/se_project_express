const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");
const cors = require("cors");

const app = express();
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("DB connected");
  })
  .catch(console.error);

const { PORT = 3001 } = process.env;
app.use(express.json());

app.use("/", indexRouter);
app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
