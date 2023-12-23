const express = require("express");
const app = express();
const cors = require("cors");
const pg = require("pg");
require("dotenv").config();

const pgConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: 5432,
  database: process.env.PGDATABASE,
  ssl: true,
};

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const client = new pg.Client(pgConfig);
client.connect();

//routes
app.get("/", (req, res) => {
  res.send("Task MANAGER API");
});

//create a task
app.post("/tasks", async (req, res) => {
  try {
    const { description, date } = req.body;
    const newTask = await client.query(
      "INSERT INTO tasks (description, finishby) VALUES($1, $2) RETURNING *;",
      [description, date]
    );
    res.json(newTask.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await client.query("SELECT * FROM tasks;");
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a task
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleTask = await client.query(
      "SELECT * FROM tasks WHERE task_id=$1;",
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
    const { description, date } = req.body;
    const updateTask = await client.query(
      "UPDATE tasks SET description=$1, finishby=$2 WHERE task_id=$3;",
      [description, date, id]
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
    const deleteTask = await client.query(
      "DELETE FROM tasks WHERE task_id=$1;",
      [id]
    );
    res.json("Task was deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
