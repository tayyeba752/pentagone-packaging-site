const mongoose = require("mongoose");
const IndustrySchema = new mongoose.Schema(
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
        industry: {
            type: String,
            unique: true
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

module.exports = mongoose.model("Industrys", IndustrySchema); 