const todoService = require("../services/todoService");

async function getAllTodos(req, res, next) {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}

async function getTodoById(req, res, next) {
  const { id } = req.params;
  try {
    const todo = await todoService.getTodoById(parseInt(id));
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

async function createTodo(req, res, next) {
  const { title } = req.body;
  try {
    const newTodo = await todoService.createTodo({ title });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
}

async function updateTodo(req, res, next) {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const updatedTodo = await todoService.updateTodo(parseInt(id), {
      title,
      completed,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
}

async function deleteTodo(req, res, next) {
  const { id } = req.params;
  try {
    await todoService.deleteTodo(parseInt(id));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
