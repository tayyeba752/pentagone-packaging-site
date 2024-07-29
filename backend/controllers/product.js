const Products = require("../models/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");

exports.postNew = async function (req, res) {
  console.log("nnnnnn", req.body)
  // const {password, email, } = req.body;
  const currentDate = new Date(); // Create a new Date object

  // Get individual date and time components from the Date object
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based (0 = January)
  const day = String(currentDate.getDate()).padStart(2, '0');
  let hours = currentDate.getHours();
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12;

  // Formatted date and time string
  const formattedDateTime = `D${day}-${month}-${year}T${hours}:${minutes}${ampm}`;
  const { title, description, industry, shapeStyle, material, image, mataTags, mataDescription, mataTitle, FocusKeyWords, productCatagory } = req.body;
  const dateTime = formattedDateTime;
  if (
    !title ||
    !description ||
    !industry ||
    !shapeStyle ||
    !material ||
    !image ||
    !mataTags ||
    !mataDescription ||
    !mataTitle ||
    !FocusKeyWords ||
    !productCatagory
  ) {
    return res.status(422).json({
      message: "All feilds are required",
    });
  }
  try {
    const product = new Products({ title: title, description: description, industry: industry, shapeStyle: shapeStyle, material: material, dateTime: dateTime, type: "blog", image: image, mataTags: mataTags, mataDescription: mataDescription, mataTitle: mataTitle, FocusKeyWords: FocusKeyWords, productCatagory: productCatagory });
    const products = await product.save();
    res.status(200).json({ message: "successSave", products });
  } catch (error) {
    console.log("is match 1st error===>>>", error)
    res.status(404).json({ success: false, message: error.message });
  }
};



exports.AllProducts = async function (req, res) {
  try {
    console.log("Before Products.find()");
    const products = await Products.find();
    console.log("After Products.find()");
    res.status(200).json({ message: "Getting", products });
  } catch (error) {
    console.log("is match 1st error===>>>", error);
    res.status(404).json({ success: false, message: error.message });
  }
};


exports.GetSingleProduct = async function (req, res) {
  console.log("abc=====", req.params.id);
  let ID = req.params.id;
  try {
    console.log("Before Blog.find()");
    const products = await Products.find({ _id: ID });
    res.status(200).json({ message: "Success", products });
  } catch (error) {
    console.log("is match 1st error===>>>", error)
    res.status(404).json({ success: false, message: error.message });
  }
};



exports.GetSingleProductByName = async function (req, res) {
  console.log("abc=====", req.params.id);
  console.log("Search Term:", req.params.id);
  let searchTerm = req.params.id;
  try {
    console.log("Before Products.find()");
    const products = await Products.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search
        { industry: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search
        { shapeStyle: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search
        { material: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search
        { mataTags: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search
        // Add more fields if needed
      ]
    });

    if (products.length > 0) {
      res.status(200).json({ message: "Success", products });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.DeleteSinglProduct = async function (req, res) {
  let ID = req.params.id;
  try {
    Products.deleteOne({ _id: ID }, (err, response) => {
      if (response === null) {
        res.json({ message: "User Not Found" })
      } else {
        console.log("user found")
        res.status(200).json({ response, message: "SuccessDelete" })
      }
    });
  } catch (error) {
    console.log("is match 1st error===>>>")
    res.status(404).json({ success: false, message: error.message });
  }
};