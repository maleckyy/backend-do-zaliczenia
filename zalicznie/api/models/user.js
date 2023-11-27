const mongoose = require("mongoose")
const userScheme = mongoose.Schema({email: String, passowrd: String });

module.exports = mongoose.model("User", userScheme)

