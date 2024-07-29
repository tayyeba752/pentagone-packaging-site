const Quoteforms = require("../models/Quoteform");
const Email = require("../controllers/email");
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
    const { color, images, depth, email, length, message, name, phNum, productInfo, units, width, stock } = req.body;
    const dateTime = formattedDateTime;
    if (
        !color ||
        !images ||
        !depth ||
        !email ||
        !length ||
        !message ||
        !name ||
        !phNum ||
        !productInfo ||
        !width ||
        !stock
    ) {
        return res.status(422).json({
            message: "All feilds are required",
        });
    }
    try {
        const quoteform = new Quoteforms({ color: color, images: images, depth: depth, email: email, length: length, message: message, name: name, type: "Quote", phNum: phNum, productInfo: productInfo, units: units, width: width, stock: stock, dateTime: dateTime, type: "Quote" });
        const quoteforms = await quoteform.save();
        console.log("abc, ", quoteforms);

        res.status(200).json({ message: "successSave" });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};



exports.GetAllQuoteData = async function (req, res) {
    try {
        console.log("Before Products.find()");
        const quoteforms = await Quoteforms.find();
        console.log("After Products.find()");
        res.status(200).json({ message: "Getting", quoteforms });
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


