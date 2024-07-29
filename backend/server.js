const args = process.argv;

const path = require("path");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const user = require("./routes/user");
const uploadRoute = require("./routes/upload");
const product = require("./routes/product");
const testimonial = require("./routes/testimonial");
const industry = require("./routes/industry");
const catagory = require("./routes/catagory");
const shape = require("./routes/shape");
const material = require("./routes/material");
const other = require("./routes/other");
const email = require("./routes/email");
const homepage = require("./routes/homepage");

const quoteform = require("./routes/quoteform");
const header = require("./routes/header");
const app = express();


//Configuring the Environment Variables
dotenv.config();
// dotenv.config({ path: "./config/.env" });

// BODYPARSER MIDDLEWARE
app.use(express.json());
//CORS
app.use(cors());
app.use(logger("dev"));
// ROUTES 
app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/testimonial", testimonial);
app.use("/api/upload", uploadRoute);
app.use("/api/quoteform", quoteform);
app.use("/api/header", header);
app.use("/api/industry", industry);
app.use("/api/catagory", catagory);
app.use("/api/shape", shape);
app.use("/api/material", material);
app.use("/api/other", other);
app.use("/api/email", email);
app.use("/api/homepage", homepage);





//SERVE STATIC ASSET IF IN PRODUCTION

app.use("/assets", express.static("public"));

if (process.env.NODE_ENV === "production") {
  // SET STATIC FOLDER

  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.use((error, req, res, next) => {
  const message = error.message;
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: message,
  });
});

//CONFIGURE PORT
const PORT = process.env.PORT || args[2] || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  //Db connection
  connectDb();
  console.log(
    `Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`
  );
});

//Handle the promise rejection error
process.on("unhandledRejection", (err, promise) => {
  console.log("Error: ", err.message);
  server.close(() => process.exit(1));
});