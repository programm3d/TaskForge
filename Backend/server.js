const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.get("/test", (req, res) => {
  res.status(200).send({ msg: "Test Succcessful" });
});

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.use((req, res) => {
  res.status(404).send({ msg: "Undefined Route" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});
