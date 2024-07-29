const Testimonials = require("../models/Testimonial");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");

exports.postNewTestimonial = async function (req, res) {
  const { clientName, fieldName, plateformName, review, gender } = req.body;
  if (
    !clientName ||
    !fieldName ||
    !plateformName ||
    !review ||
    !gender
  ) {
    return res.status(422).json({
      message: "All feilds are required",
    });
  }
  try {
    const testimonial = new Testimonials({ clientName: clientName, fieldName: fieldName, plateformName: plateformName, review: review, gender: gender });
    const testimonials = await testimonial.save();
    res.status(200).json({ message: "successSave", testimonials });
  } catch (error) {
    console.log("is match 1st error===>>>", error)
    res.status(404).json({ success: false, message: error.message });
  }
};



exports.getAll = async function (req, res) {
  try {
    const testimonials = await Testimonials.find();
    res.status(200).json({ message: "successSave", testimonials });
  } catch (error) {
    console.log("is match 1st error===>>>", error)
    res.status(404).json({ success: false, message: error.message });
  }
};




exports.deleteOne = async function (req, res) {
  let ID = req.params.id;
  try {
    const testimonials = await Testimonials.deleteOne({ _id: ID });
    res.status(200).json({ message: "successDelete", testimonials });
  } catch (error) {
    console.log("is match 1st error===>>>", error)
    res.status(404).json({ success: false, message: error.message });
  }
};