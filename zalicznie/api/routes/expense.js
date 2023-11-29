const express = require("express");
const router = express.Router();
const Expenses = require("../models/expense");
const checkAuth = require("../middleware/checkAuth");
const expenseControllers = require("../controllers/expense");

// POBRANIE WSZYSTKICH WYDATKÓW BEZ AUTORYZACJI
router.get("/", expenseControllers.get_all_expenses);

// DODANIE NOWEGO WYDATKU Z AUTORYZACJĄ body{title,price}, headers: {Authorization: 'Bearer {token}'}
router.post("/new", checkAuth, expenseControllers.add_new_expense);

// EDYTOWANIE WYDATKU PO ID body{title,price}, headers: {Authorization: 'Bearer {token}'}
router.post("/edit/:id", checkAuth, expenseControllers.edit_expense_by_id);

//USUWANIE WYDATKU PO ID {Authorization: 'Bearer {token}'}
router.delete(
  "/delete/:id",
  checkAuth,
  expenseControllers.delete_expense_by_id
);

module.exports = router;
