const Material = require("../models/Material");
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
    const { title, description, material, image, mataTags, mataDescription, mataTitle, FocusKeyWords, productCatagory } = req.body;
    const dateTime = formattedDateTime;


    if (!title || !description || !material || !image || !mataTags || !mataDescription || !mataTitle || !FocusKeyWords || !productCatagory) {
        return res.status(422).json({
            message: "All feilds are required",
        });
    }
    try {
        const materiall = new Material({ title: title, description: description, material: material, dateTime: dateTime, type: "Material", image: image, mataTags: mataTags, mataDescription: mataDescription, mataTitle: mataTitle, FocusKeyWords: FocusKeyWords, productCatagory: productCatagory });
        const materialls = await materiall.save();
        res.status(200).json({ message: "successSave", materialls });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};

exports.getById = async function (req, res) {
    let ID = req.params.id;

    try {
        const material = await Material.find({ material: ID });
        res.status(200).json({ message: "Success", material });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};

exports.getAll = async function (req, res) {
    try {
        const material = await Material.find();
        res.status(200).json({ message: "Success", material });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};



exports.deleteOne = async function (req, res) {
    let ID = req.params.id;
    console.log("aaa", ID)
    try {
        const material = await Material.deleteOne({ _id: ID });
        res.status(200).json({ message: "SuccessDelete", material });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};


exports.updateData = async function (req, res) {
    let { title, description, material, image, mataTags, mataDescription, mataTitle, FocusKeyWords, productCatagory } = req.body;
    try {
        const materials = await Material.updateOne({ material: material }, req.body);
        res.status(200).json({ message: "Success", materials });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};