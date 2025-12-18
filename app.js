const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const { PORT = 3001 } = process.env;
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "694339b4448f1b06b2e38d1c",
  };
  next();
});

app.use("/", indexRouter);
app.use((req, res) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
