const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REJSTRACJA

router.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then((foundUser) => {
    if (foundUser) {
      res.status(201).json({wiadomosc:"Ten użytkownik już istnieje"});
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user.save().then(()=> {
            return ( res.status(201).json({wiadomosc:"Użytkownik zarejestrowany"}))
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json("Błąd serwera");
        });
      });
    }
  })


});

// LOGOWANIE
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

module.exports = router;
