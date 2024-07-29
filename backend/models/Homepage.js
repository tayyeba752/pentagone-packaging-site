const mongoose = require("mongoose");
const HomepageSchema = new mongoose.Schema(
    {
        howToOrder: {
            type: String,
        },
        quoteOption: {
            type: String,
        },
        IndusHead: {
            type: String,
        },
        orderHead: {
            type: String,
        },
        lastSection: {
            type: String
        },
        lastSectionDetail: {
            type: String
        },
        lastSectionDetailleft: {
            type: String
        },
        imageHowToOrder: {
            type: Array
        },
    }
);

module.exports = mongoose.model("Homepages", HomepageSchema);
