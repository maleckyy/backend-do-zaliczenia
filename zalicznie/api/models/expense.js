const mongoose = require("mongoose");
const expenseScheme = mongoose.Schema({
  title: String,
  price: Number,
  created: String,
});

module.exports = mongoose.model("Expense", expenseScheme);


