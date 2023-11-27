const mongoose = require("mongoose");
const userScheme = mongoose.Schema({ email: String, password: String });

module.exports = mongoose.model("User", userScheme);
