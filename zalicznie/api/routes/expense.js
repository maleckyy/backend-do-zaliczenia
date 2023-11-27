const express = require("express");
const router = express.Router();
const Expenses = require("../models/expense");
//
// metoda get - pobranie wszystkich wydatków
router.get("/", (req, res) => {
  Expenses.find().then((result) => {
    res.status(201).json({ wiadomosc: "expense get", data: result });
  });
});
//
// {title: String, price: Number, created: Date }
//
// metoda get - dodanie nowego dodatku do bazy danych
router.post("/new", (req, res) => {
  const newExpense = new Expenses({
    title: req.body.title,
    price: req.body.price,
    created: new Date().toLocaleDateString(),
  });

  newExpense.save();
  res.status(201).json({ data: newExpense });
});
// metoda get do edytowania
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const expense = await Expenses.findById({ _id: id });
  expense.title = req.body.title;
  expense.price = req.body.price;

  expense.save();
  res.status(201).json({ wiadomosc: `Zmieniono wydatek o id ${id}` });
});
//metoda delete do usuwania prze id
router.delete("/delete/:id", async(req,res)=>{
  const id = req.params.id
  const result = await Expenses.deleteOne({_id: id})
    res.status(201).json({ wiadomosc: "expense deleted", result})
})

module.exports = router;
