const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");

// @route GET api/user
// @desc Returns all users
// @access Public
exports.signup = async function (req, res) {
  console.log("Abc===>>>", req.body)
  const { name, email, phNum, country, password } = req.body;
  if (
    !name ||
    !email ||
    !phNum ||
    !country ||
    !password
  ) {
    res.status(500).json({ message: "Empty Fields" })
  } else {
    try {
      // let pass = await bcrypt.hash(password, 12);
      const user = new User({ name: name, email: email, phNum: phNum, country: country, password: password });
      const users = await user.save();
      res.status(200).json({ message: "success", users });
    }
    catch (error) {
      console.log("bbbbb", error.code)
      res.send({ success: false, message: error.code, status: error.code });
    }
  }
};


exports.login = async function (req, res) {
  console.log("Abc===>>>", req.body)
  // const {password, email, } = req.body;
  const email = req.body.email
  const password = req.body.password

  try {
    User.findOne({ email: email, password: password }, (err, response) => {
      console.log("Response-Login=====>>>>", response);
      if (response === null) {
        console.log("err=====", err)
        res.json({ message: "User Not Found" })
      } else {
        console.log("user found", response)
        res.status(200).json({ response, message: "successLogin" })
      }
    });
  } catch (error) {
    console.log("is match 1st error===>>>")
    res.status(404).json({ success: false, message: error.message });
  }
};


exports.GetAllUser = async function (req, res) {
  try {
    User.find((err, response) => {
      if (response === null) {
        res.json({ message: "User Not Found" })
      } else {
        console.log("user found")
        res.status(200).json({ response })
      }
    });
  } catch (error) {
    console.log("is match 1st error===>>>")
    res.status(404).json({ success: false, message: error.message });
  }
};




