const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "nothing"
        },
        description: {
            type: String,
            default: "nothing"
        },
        industry: {
            type: String,
            default: "nothing"
        },
        shapeStyle: {
            type: String,
            default: "nothing"
        },
        material: {
            type: String,
            default: "nothing"
        },
        dateTime: {
            type: String
        },
        type: {
            type: String,
            default: "product"
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
            default: "Product"
        }
    }
);

module.exports = mongoose.model("Products", ProductSchema);
