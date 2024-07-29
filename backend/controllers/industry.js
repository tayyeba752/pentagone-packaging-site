const Industry = require("../models/Industry");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");

exports.postNew = async function (req, res) {
    console.log("nnnnnn", req.body);
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
    const { title, description, description2, industry, image, mataTags, mataDescription, mataTitle, FocusKeyWords, productCatagory } = req.body;
    const dateTime = formattedDateTime;


    if (!title || !description || !description2 || !industry || !image || !mataTags || !mataDescription || !mataTitle || !FocusKeyWords || !productCatagory) {
        return res.status(422).json({
            message: "All feilds are required",
        });
    }
    try {
        const industrie = new Industry({ title: title, description: description, description2: description2, industry: industry, dateTime: dateTime, type: "Industry", image: image, mataTags: mataTags, mataDescription: mataDescription, mataTitle: mataTitle, FocusKeyWords: FocusKeyWords, productCatagory: productCatagory });
        const industries = await industrie.save();
        res.status(200).json({ message: "successSave", industries });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};

exports.getById = async function (req, res) {
    let ID = req.params.id; 
    console.log("aaa", ID)
    try {
        const industries = await Industry.findOne({ _id: ID }); 
        res.status(200).json({ message: "Success", industries });   
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};



exports.getAll = async function (req, res) {
    try {
        const industries = await Industry.find();
        res.status(200).json({ message: "Success", industries });
    } catch (error) {
        console.log("is match 1st error===>>>", error);
        res.status(404).json({ success: false, message: error.message });
    }
};


exports.deleteOne = async function (req, res) {
    let ID = req.params.id;
    console.log("aaa", ID)
    try {
        const industries = await Industry.deleteOne({ _id: ID });
        res.status(200).json({ message: "SuccessDelete", industries });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};


exports.updateData = async function (req, res) {
    let { id ,title, description, industry, image, mataTags, mataDescription, mataTitle, FocusKeyWords, productCatagory } = req.body;
    try {
        const industries = await Industry.updateOne({ _id: id }, req.body);
        res.status(200).json({ message: "Success", industries });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};







exports.search = async function (req, res) {
    console.log("abc=====", req.params.id);
    console.log("Search Term:", req.params.id);
    let searchTerm = req.params.id;
    try {
        console.log("Before Products.find()");
        const data = await Industry.find({
            $or: Object.keys(Industry.schema.obj).map(field => ({
                [field]: { $regex: new RegExp(searchTerm, 'i') }
            }))
        });

        if (data.length > 0) {
            res.status(200).json({ message: "Success", data });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

 


exports.GetSingleProduct = async function (req, res) {
    console.log("abc=====", req.params.id);
    let ID = req.params.id;
    try {
        console.log("Before Blog.find()");
        const data = await Industry.find({ _id: ID });
        res.status(200).json({ message: "Success", data });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};