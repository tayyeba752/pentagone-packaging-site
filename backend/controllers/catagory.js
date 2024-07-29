const Catagory = require("../models/Catagory");
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
    const { title, description, category, image, mataTags, mataDescription, mataTitle, FocusKeyWords, productCatagory, description2 } = req.body;
    const dateTime = formattedDateTime;


    if (!title || !description || !description2 || !category || !image || !mataTags || !mataDescription || !mataTitle || !FocusKeyWords || !productCatagory) {
        return res.status(422).json({
            message: "All feilds are required",
        });
    }
    try {
        const catagorie = new Catagory({ title: title, description: description, description2: description2, category: category, dateTime: dateTime, type: "Catagory", image: image, mataTags: mataTags, mataDescription: mataDescription, mataTitle: mataTitle, FocusKeyWords: FocusKeyWords, productCatagory: productCatagory });
        const catagories = await catagorie.save();
        res.status(200).json({ message: "successSave", catagories });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};

exports.getById = async function (req, res) {
    let ID = req.params.id;

    try {
        const catagori = await Catagory.find({ _id: ID });
        console.log("abc-====>>>", ID);
        console.log("abc-====>>>", catagori);
        res.status(200).json({ message: "Success", catagori });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};




exports.getOneRelToIndustry = async function (req, res) {
    let ID = req.params.id;

    try {
        const catagori = await Catagory.find({ category: ID });
        console.log("abc-====>>>", ID);
        console.log("abc-====>>>", catagori);
        res.status(200).json({ message: "Success", catagori });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};



exports.getAll = async function (req, res) {
    try {
        const catagory = await Catagory.find();
        res.status(200).json({ message: "Success", catagory });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};



exports.deleteOne = async function (req, res) {
    let ID = req.params.id;
    console.log("aaa", ID)
    try {
        const catagory = await Catagory.deleteOne({ _id: ID });
        res.status(200).json({ message: "SuccessDelete", catagory });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};



exports.updateData = async function (req, res) {
    let { id , title, description, category, image, mataTags, mataDescription, mataTitle, FocusKeyWords, productCatagory } = req.body;
    try {
        console.log("abc====", req.body)
        const catagories = await Catagory.updateOne({ _id: id}, req.body);
        res.status(200).json({ message: "Success", catagories });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};



// exports.updateData = async function (req, res) {
//     let { title, description, catagory, image, mataTags, mataDescription, mataTitle, FocusKeyWords, productCatagory } = req.body;
//     try {
//         const catagories = await Catagory.updateOne({ catagory: catagory }, req.body);
//         res.status(200).json({ message: "Success", catagories });
//     } catch (error) {
//         console.log("is match 1st error===>>>", error)
//         res.status(404).json({ success: false, message: error.message });
//     }
// };


