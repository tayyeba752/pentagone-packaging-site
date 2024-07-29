const Headers = require("../models/Header");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");

exports.postNew = async function (req, res) {
    console.log("nnnnnn", req.body);
    let img = req.body;

    if (
        !img
    ) {
        return res.status(422).json({
            message: "All feilds are required",
        });
    }
    try {
        const header = new Headers({ img: img });
        const headers = await header.save();
        res.status(200).json({ message: "successSave", headers });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};

exports.getAll = async function (req, res) {
    try {
        const headers = await Headers.find();
        console.log("abc====", headers.length);
        console.log("abc====", headers[headers.length - 1]);
        res.status(200).json({ message: "successSave", header: headers[headers.length - 1] });
    } catch (error) {
        console.log("is match 1st error===>>>", error)
        res.status(404).json({ success: false, message: error.message });
    }
};
