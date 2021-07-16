const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const format = require("date-fns/format");
const dbPath = path.join(__dirname, "todoApplication.db");
const port = process.env.PORT || 3000;
const app = express();
const cors=require("cors");
app.use(cors());
app.options('*',cors());
var parseISO = require("date-fns/parseISO");

app.use(express.json());

let db = null;

const startServerAndDatabase = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  app.listen(port);
};

startServerAndDatabase();

function validator(request, response, next) {
  const query = request.query;
  const { status, priority, search_q = "", category } = query;
  let flag = 0;

  if (
    priority !== undefined &&
    priority !== "HIGH" &&
    priority !== "MEDIUM" &&
    priority !== "LOW"
  ) {
    response.status(400);
    response.send("Invalid Todo Priority");
    flag = 1;
  } else if (
    status !== undefined &&
    status !== "TO DO" &&
    status !== "IN PROGRESS" &&
    status !== "DONE"
  ) {
    response.status(400);
    response.send("Invalid Todo Status");
    flag = 1;
  } else if (
    category !== undefined &&
    category !== "HOME" &&
    category !== "LEARNING" &&
    category !== "WORK"
  ) {
    response.status(400);
    response.send("Invalid Todo Category");
    flag = 1;
  }
  if (flag === 0) {
    next();
  }
}

//API 1

function handler(obj) {
  const result = {
    id: obj["id"],
    todo: obj["todo"],
    priority: obj["priority"],
    category: obj["category"],
    status: obj["status"],
    dueDate: obj["due_date"],
  };
  return result;
}

app.get("/todos/", validator, async (request, response) => {
  const query = request.query;
  const { status, priority, search_q = "", category } = query;
  if (
    category !== undefined &&
    priority !== undefined &&
    status !== undefined
  ) {
    const search = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%'
        AND category='${category}' AND priority='${priority}' AND status='${status}';`;
    const result = await db.all(search);
    const final = result.map(handler);
    response.send(final);
  }
  else if (category !== undefined && priority !== undefined) {
    const search = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%'
        AND category='${category}' AND priority='${priority}';`;
    const result = await db.all(search);
    const final = result.map(handler);
    response.send(final);
  } else if (category !== undefined && status !== undefined) {
    const search = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%'
        AND category='${category}' AND status='${status}';`;
    const result = await db.all(search);
    const final = result.map(handler);
    response.send(final);
  } else if (priority !== undefined && status !== undefined) {
    const search = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%'
        AND priority='${priority}' AND status='${status}';`;
    const result = await db.all(search);
    const final = result.map(handler);
    response.send(final);
  } else if (status !== undefined) {
    const search = `SELECT * FROM todo WHERE status='${status}';`;
    const result = await db.all(search);
    const final = result.map(handler);
    response.send(final);
  } else if (priority !== undefined) {
    const search = `SELECT * FROM todo WHERE priority='${priority}';`;
    const result = await db.all(search);
    const final = result.map(handler);
    response.send(final);
  } else if (category !== undefined) {
    const search = `SELECT * FROM todo WHERE category='${category}';`;
    const result = await db.all(search);
    const final = result.map(handler);
    response.send(final);
  } else {
    const search = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%';`;
    const result = await db.all(search);
    const final = result.map(handler);
    response.send(final);
  }
});

//API 2

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const query = `SELECT * FROM todo WHERE id=${todoId};`;
  const result = await db.get(query);
  if (result === undefined) {
    response.send({value:"nothing"});
  } else {
    const final = handler(result);
    response.send(final);
  }
});

//API 3

app.get("/agenda/", async (request, response) => {
  const { date } = request.query;
  try {
    const newer = format(new Date(date), "yyyy-MM-dd");
    const query = `SELECT * FROM todo WHERE due_date='${newer}';`;
    const result = await db.all(query);
    const final = result.map(handler);
    response.send(final);
  } catch (e) {
    response.status(400);
    response.send("Invalid Due Date");
  }
});

//API 4

function postValidator(request, response, next) {
  const todoList = request.body;
  const { id, todo, priority, category, status, dueDate } = todoList;
  let flag = 0;
  if (
    priority !== undefined &&
    priority !== "HIGH" &&
    priority !== "MEDIUM" &&
    priority !== "LOW"
  ) {
    response.status(400);
    response.send("Invalid Todo Priority");
    flag = 1;
  } else if (
    status !== undefined &&
    status !== "TO DO" &&
    status !== "IN PROGRESS" &&
    status !== "DONE"
  ) {
    response.status(400);
    response.send("Invalid Todo Status");
    flag = 1;
  } else if (
    category !== undefined &&
    category !== "HOME" &&
    category !== "LEARNING" &&
    category !== "WORK"
  ) {
    response.status(400);
    response.send("Invalid Todo Category");
    flag = 1;
  } else if (dueDate !== undefined) {
    try {
      const newer = format(new Date(dueDate), "yyyy-MM-dd");
    } catch (e) {
      response.status(400);
      response.send("Invalid Due Date");
      flag = 1;
    }
  }
  if (flag === 0) {
    next();
  }
}

app.post("/todos/", postValidator, async (request, response) => {
  const todoList = request.body;
  const { id, todo, priority, category, status, dueDate } = todoList;
  const newer = format(new Date(dueDate), "yyyy-MM-dd");
  const query = `INSERT INTO todo(id,todo,priority,category,status,due_date) VALUES(${id},'${todo}','${priority}','${category}','${status}','${newer}');`;
  await db.run(query);
  response.send("Todo Successfully Added");
});

//API 5

app.put("/todos/:todoId/", postValidator, async (request, response) => {
  const { todoId } = request.params;
  const todoList = request.body;
  const { id, todo, priority, category, status, dueDate } = todoList;
  if (status !== undefined) {
    const query = `UPDATE todo SET status='${status}' WHERE id=${todoId};`;
    await db.run(query);
    response.send("Status Updated");
  } else if (todo !== undefined) {
    const query = `UPDATE todo SET todo='${todo}' WHERE id=${todoId};`;
    await db.run(query);
    response.send("Todo Updated");
  } else if (priority !== undefined) {
    const query = `UPDATE todo SET priority='${priority}' WHERE id=${todoId};`;
    await db.run(query);
    response.send("Priority Updated");
  } else if (dueDate !== undefined) {
    const newer = format(new Date(dueDate), "yyyy-MM-dd");
    const query = `UPDATE todo SET due_date='${newer}' WHERE id=${todoId};`;
    await db.run(query);
    response.send("Due Date Updated");
  } else if (category !== undefined) {
    const query = `UPDATE todo SET category='${category}' WHERE id=${todoId};`;
    await db.run(query);
    response.send("Category Updated");
  }
});

//API 6

app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const query = `DELETE FROM todo WHERE id=${todoId};`;
  await db.run(query);
  response.send("Todo Deleted");
});
module.exports = app;
