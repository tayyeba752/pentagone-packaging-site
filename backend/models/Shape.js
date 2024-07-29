const mongoose = require("mongoose");
const ShapeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        shape: {
            type: String,
            unique: true
        },
        dateTime: {
            type: String
        },
        type: {
            type: String,
            default: "ShapesStyle"
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
            default: "ShapesStyle"
        }
    }
);

module.exports = mongoose.model("Shapes", ShapeSchema);
