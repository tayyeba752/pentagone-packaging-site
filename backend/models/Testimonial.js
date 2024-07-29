const mongoose = require("mongoose");
const TestimonialSchema = new mongoose.Schema(
    {
        clientName: {
            type: String,
        },
        fieldName: {
            type: String,
        },
        plateformName: {
            type: String,
        },
        review: {
            type: String,
            unique:true
        },
        gender:{
            type: String,
            default:"male"
        }
    }
);

module.exports = mongoose.model("Testimonials", TestimonialSchema);
