const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllTodos() {
  return await prisma.todo.findMany({
    where: {
      isDeleted: false,
    },
  });
}

async function getTodoById(id) {
  const todo = prisma.todo.findUnique({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  if (!(await todo)) {
    const error = new Error("Todo not found!");
    error.statusCode = 404;
    throw error;
  }
  return todo;
}

async function createTodo(data) {
  return await prisma.todo.create({
    data: {
      title: data.title,
    },
  });
}

async function updateTodo(id, data) {
  try {
    return await prisma.todo.update({
      where: { id: id, isDeleted: false },
      data: data,
    });
  } catch (error) {
    if (error.code === "P2025") {
      const notFoundError = new Error("Todo not found!");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    throw error;
  }
}

async function deleteTodo(id) {
  try {
    await prisma.todo.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  } catch (error) {
    if (error.code === "P2025") {
      const notFoundError = new Error("Todo not found");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    throw error;
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
