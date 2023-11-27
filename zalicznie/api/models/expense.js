const mongoose = require("mongoose")
const expenseScheme = mongoose.Schema({title: String, price: Number, created: Date });

module.exports = mongoose.model("Expense", expenseScheme)