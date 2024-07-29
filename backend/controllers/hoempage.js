const Homepage = require("../models/Homepage");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");

exports.postNew = async function (req, res) {
    console.log("nnnnnn", req.body);
    let { orderHead, IndusHead, quoteOption, howToOrder } = req.body;

    if (
        !orderHead ||
        !IndusHead ||
        !quoteOption ||
        !howToOrder
    ) {
        return res.status(422).json({
            message: "All feilds are required",
        });
    }
    try {
        const hoempage = new Homepage({ orderHead: orderHead, IndusHead: IndusHead, quoteOption: quoteOption, howToOrder: howToOrder });
        const hoempages = await hoempage.save();
        res.status(200).json({ message: "successSave", hoempages });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};

exports.getAll = async function (req, res) {
    try {
        const hoempages = await Homepage.find();
        console.log("abc====", hoempages.length);
        console.log("abc====", hoempages[hoempages.length - 1]);
        res.status(200).json({ message: "successSave", hoempage: hoempages[hoempages.length - 1] });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};


// exports.updateData = async function (req, res) {
//     let data = req.body;
//     let { id, orderHead, IndusHead, quoteOption, howToOrder, imageHowToOrder, lastSection, lastSectionDetail, lastSectionDetailleft } = data;
//     console.log("abc====", req.body);
//     try {
//         const hoempages = await Homepage.findByIdAndUpdate(id, data, { new: true });
//         res.status(200).json({ message: "successSave", hoempages });
//     } catch (error) {
//         console.log("is match 1st error===>>>", error)
//         res.status(404).json({ success: false, message: error.message });
//     }
// };

exports.updateData = async function (req, res) {
    let data = req.body;
    let { id, orderHead, IndusHead, quoteOption, howToOrder, imageHowToOrder, lastSection, lastSectionDetail, lastSectionDetailleft } = data;
    console.log("abc====", req.body);
    
    try {
        let homepage;

        if (id) {
            homepage = await Homepage.findByIdAndUpdate(id, data, { new: true });
        }

        if (homepage) {
            // Document was found and updated
            res.status(200).json({ message: "successSave", homepage });
        } else {
            // Document not found, create a new one
            homepage = new Homepage(data);
            await homepage.save();
            res.status(201).json({ message: "successCreate", homepage });
        }
    } catch (error) {
        console.log("is match 1st error===>>>", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

