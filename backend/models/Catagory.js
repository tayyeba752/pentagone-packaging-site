const mongoose = require("mongoose");
const CatagorySchema = new mongoose.Schema(
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
        category: {
            type: String
        },
        dateTime: {
            type: String
        },
        type: {
            type: String,
            default: "Catagory"
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
            default: "Catagory"
        }
    }
);

module.exports = mongoose.model("Catagorys", CatagorySchema);
