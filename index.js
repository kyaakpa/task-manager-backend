const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//routes
//create a task
app.post("/tasks", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
});
//get all tasks

//get a task

//update a task

//delete a task

app.listen(5500, () => {
  console.log("Server started on port 5500.");
});
