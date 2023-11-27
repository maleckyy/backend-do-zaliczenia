const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// import mongoose
// połączenie z bazą
mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@cluster0.0gkqsve.mongodb.net/?retryWrites=true&w=majority"
);
// mongodb+srv://admin:admin@cluster0.0gkqsve.mongodb.net/

// instancja expresa
const app = express();
app.use(express.json());
// uruchamiam logera
const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// routy
// const userRoutes = require("./api/routes/user");
const expenseRoutes = require("./api/routes/expense");

// app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);
app.get("/", (req, res, next) => {
  res.status(201).json({ wiadomosc: "działa witam" });
});

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: "Nie odnaleziono" });
});

module.exports = app;
