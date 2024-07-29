const { delete: deleteFile } = require("../config/upload");

exports.uploadSingle = (req, res) => {
  res.status(200).json(req.file);
};

exports.uploadMultiple = (req, res) => {
  let file = req.files;
  console.log("body======", file)
  res.status(200).json({file , message:"imagesSaved"});
};

exports.delete = (req, res) => {
  const url = req.body.url;
  const resp = deleteFile(url);
  res.status(200).json({ message: resp });
};
