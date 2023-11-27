const express = require("express");
const router = express.Router();
const Expenses = require("../models/expense");
//
router.get("/", (req, res) => {
  Expenses.find().then((result) => {
    res.status(201).json({ wiadomosc: "expense get", data: result });
  });
});
// {title: String, price: Number, created: Date }
router.post("/new", (req, res) => {
  //
  const newExpense = new Expenses({
    title: req.body.title,
    price: req.body.price,
    created: new Date().toLocaleDateString(),
  });


  newExpense.save();
  res.json(newExpense);
  //
});


//metoda delete do usuwania prze id
router.delete("/delete/:id", async(req,res)=>{
  const id = req.params.id
  const result = await Expenses.deleteOne({_id: id})
    res.status(201).json({ wiadomosc: "expense deleted", result})

})

//
module.exports = router;
