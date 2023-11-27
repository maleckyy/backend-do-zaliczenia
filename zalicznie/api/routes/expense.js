const express = require("express");
const router = express.Router();
const Expenses = require("../models/expense");
//
router.get("/", (req, res, next) => {
  res.status(201).json({ wiadomosc: "expense get" });
});

//
module.exports = router;
