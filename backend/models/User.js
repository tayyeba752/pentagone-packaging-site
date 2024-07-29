const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    phNum: {
      type: String,
      unique: true
    },
    country: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
  }
);

module.exports = mongoose.model("Users", UserSchema);
