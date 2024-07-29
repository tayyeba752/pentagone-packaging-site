const mongoose = require("mongoose");
const MaterialSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },

        material: {
            type: String,
            unique: true
        },
        dateTime: {
            type: String
        },
        type: {
            type: String,
            default: "Material"
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
            default: "Material"
        }
    }
);

module.exports = mongoose.model("Materials", MaterialSchema); 