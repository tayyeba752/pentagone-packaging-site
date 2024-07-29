const mongoose = require("mongoose");
const HeaderSchema = new mongoose.Schema(
    {
        img: {
            type: Array,
        },
    }
);

module.exports = mongoose.model("Headers", HeaderSchema);
