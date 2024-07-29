const array = require("@hapi/joi/lib/types/array");
const mongoose = require("mongoose");
const QuoteformSchema = new mongoose.Schema(
    {
        color: {
            type: String,
        },
        images: {
            type: Array,
        },
        depth: {
            type: String,
            default: "nothing"
        },
        email: {
            type: String,
        },
        length: {
            type: String,
        },
        message: {
            type: String
        },
        type: {
            type: String,
            default: "QuoteForm"
        },
        name: {
            type: String
        },
        phNum: {
            type: String
        },
        productInfo: {
            type: String
        },
        units: {
            type: String
        },
        width: {
            type: String
        },
        stock: {
            type: String,
            default: "Product"
        }
    }
);

module.exports = mongoose.model("Quoteforms", QuoteformSchema);
