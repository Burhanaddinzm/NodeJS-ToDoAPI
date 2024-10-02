require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandlingMiddleware = require("./middlewares/ErrorHandlingMiddleware");
const todoRoutes = require("./routes/todo");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    exposedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    credentials: true,
    maxAge: 3600,
  })
);

app.use("/todos", todoRoutes);
app.use(errorHandlingMiddleware);
app.all("*", (req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
