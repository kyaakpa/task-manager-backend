CREATE DATABASE taskmanager;

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
)