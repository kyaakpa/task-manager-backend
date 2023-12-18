const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Task MANAGER API");
});

//create a task
app.post("/tasks", async (req, res) => {
  try {
    const { description, prettyDate } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks (description, finishBy) VALUES($1, $2) RETURNING *",
      [description, prettyDate]
    );
    res.json(newTask.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a task
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleTask = await pool.query(
      "SELECT * FROM tasks WHERE task_id=$1",
      [id]
    );
    res.json(getSingleTask.rows);
  } catch (err) {
    console.log(err.message);
  }
});
//update a task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, prettyDate } = req.body;
    const updateTask = await pool.query(
      "UPDATE tasks SET description=$1, finishby=$2 WHERE task_id=$3",
      [description, prettyDate, id]
    );
    res.json("Task was updated.");
  } catch (err) {
    console.error(err.message);
  }
});
//delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM tasks WHERE task_id=$1", [
      id,
    ]);
    res.json("Task was deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5500, () => {
  console.log("Server started on port 5500.");
});
