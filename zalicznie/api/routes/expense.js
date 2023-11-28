const express = require("express");
const router = express.Router();
const Expenses = require("../models/expense");
const checkAuth = require("../middleware/checkAuth");

// POBRANIE WSZYSTKICH WYDATKÓW BEZ AUTORYZACJI
router.get("/", (req, res) => {
  Expenses.find().then((result) => {
    res.status(201).json({ wiadomosc: "expense get", data: result });
  });
});

// DODANIE NOWEGO WYDATKU Z AUTORYZACJĄ body{title,price}, headers: {Authorization: 'Bearer {token}'}
router.post("/new", checkAuth, (req, res) => {
  const newExpense = new Expenses({
    title: req.body.title,
    price: req.body.price,
    created: new Date().toLocaleDateString(),
  });

  newExpense.save();
  res.status(201).json({ data: newExpense });
});

// EDYTOWANIE WYDATKU PO ID body{title,price}, headers: {Authorization: 'Bearer {token}'}
router.get("/edit/:id", checkAuth, async (req, res) => {
  const id = req.params.id;
  const expense = await Expenses.findById({ _id: id });
  expense.title = req.body.title;
  expense.price = req.body.price;

  expense.save();
  res.status(201).json({ wiadomosc: `Zmieniono wydatek o id ${id}` });
});

//USUWANIE WYDATKU PO ID {Authorization: 'Bearer {token}'}
router.delete("/delete/:id", checkAuth, async (req, res) => {
  const id = req.params.id;
  const result = await Expenses.deleteOne({ _id: id });
  res.status(201).json({ wiadomosc: "expense deleted", result });
});

module.exports = router;
