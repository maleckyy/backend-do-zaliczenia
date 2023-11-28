const Expenses = require("../models/expense");

exports.get_all_expenses = (req, res, next) => {
  Expenses.find().then((result) => {
    res.status(201).json({ wiadomosc: "expense get", data: result });
  });
};

exports.add_new_expense = (req, res) => {
  const newExpense = new Expenses({
    title: req.body.title,
    price: req.body.price,
    created: new Date().toLocaleDateString(),
  });
  newExpense.save();
  res.status(201).json({ data: newExpense });
};

exports.edit_expense_by_id = async (req, res) => {
  const id = req.params.id;
  const expense = await Expenses.findById({ _id: id });
  expense.title = req.body.title;
  expense.price = req.body.price;

  expense.save();
  res.status(201).json({ wiadomosc: `Zmieniono wydatek o id ${id}` });
};

exports.delete_expense_by_id = async (req, res) => {
  const id = req.params.id;
  const result = await Expenses.deleteOne({ _id: id });
  res.status(201).json({ wiadomosc: "expense deleted", result });
};
