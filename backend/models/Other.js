const mongoose = require("mongoose");
const OtherSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        description2: {
            type: String,
        },
        other: {
            type: String
        },
        dateTime: {
            type: String
        },
        type: {
            type: String,   
            default: "Industry"
        },
        image: {
            type: Array
        },
        mataTags: {
            type: Array
        },
        mataDescription: {
            type: String
        },
        mataTitle: {
            type: String
        },
        FocusKeyWords: {
            type: Array
        },
        productCatagory: {
            type: String,
            default: "Industry"
        }
    }
);

module.exports = mongoose.model("Others", OtherSchema); 