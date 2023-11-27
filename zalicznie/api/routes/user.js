const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REJSTRACJA

router.post("/signup", (req, res, next) => {
  // sprawdzic czy juz taki uzytkownik nie istnieje
  // TASK sprawdz czy istanieje taki ziomke
  // przez email
  // if(!email){
  //     wykonuujemy to
  // }esle{
  //     nuc
  // }

  // _id : 6564ea063efccbe586fd2758
  // email : "user1"
  // __v
  // 0

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        return res
          .status(201)
          .json({ wiadomosc: "Poprawnie dodano uzytkownika" });
      })
      .catch((err) => res.status(500).json(err));
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ wiadomosc: "Błąd autoryzacji znalesc" });
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ wiadomosc: "Poprawnie zalogowano", token: token });
      } else {
        return res.status(404).json({ wiadomosc: "Błąd autoryzacji" });
      }
    });
  });
});

// LOGOWANIE

module.exports = router;
