const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const emailConfig = {
  user: 'sales@pentagonpackaging.com',
  pass: 'K3VLYGXJDNWFNM5D',
};

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: "premium166.web-hosting.com",
  port: 465,
  secure: true,
  auth: {
    user: 'sales@pentagonpackaging.com',
    pass: 'pentagon@123',
  },
});

exports.postNew = async function (req, res) {
  try {
    const { color, images, depth, email, length, message, name, phNum, productInfo, units, width, stock } = req.body;

    const mailOptions = {
      from: emailConfig.user,
      to: "sales@pentagonpackaging.com",
      subject: `${name} || Your New Order On Pentagon Packaging`,
      html: `
     <div style="max-width: 650px; margin: 0px auto; padding: 50px 0px">
      <table style="width: 100%">
        <tr>
          <td style="padding: 0px 10px; text-align: center">
            <img
              src="."
              alt="Pentagon logo"
              height="130px"
              style="margin-bottom: 30px"
            />
          </td>
        </tr>
        <tr>
          <td>
            <center>
              <h1 style="margin-bottom: 15px; color: #30acd2">
                Hi! Pentagon Packaging Team
              </h1>
            </center>
          </td>
        </tr>
        <td><h3>Your New Order Information is:</h3></td>
        <tr></tr>
        <tr>
          <td>
            <div
              style="
                border: 1px solid #ddd;
                padding: 15px;
                border-radius: 5px;
                background-color: #f9f9f9;
              "
            >
              <h2>Information:</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${phNum}</p>
              <p><strong>Product Information:</strong> ${productInfo}</p>
              <p><strong>Units:</strong> ${units}</p>
              <p><strong>Color:</strong> ${color}</p>
              <p><strong>Depth:</strong> ${depth}</p>
              <p><strong>Length:</strong> ${length}</p>
              <p><strong>Width:</strong> ${width}</p>
              <p><strong>Stock:</strong> ${stock}</p>
              <p><strong>Message:</strong> ${message}</p> 
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <a
              href="https://www.pentagonpackaging.com/"
              target="_blank"
              style="
                display: block;
                margin: 15px 0px;
                background-color: #30acd2;
                width: 175px;
                text-align: center;
                padding: 15px 25px;
                border-radius: 5px;
                color: white !important;
                text-decoration: none;
              "
              >Visit Website</a
            >
          </td>
        </tr>
        <tr>
          <td>
            <p style="margin-top: 20px">Regards,</p>
            <p>PentagonePackaging Team</p>
          </td>
        </tr>
        <tr>
          <td>
            <p style="margin-top: 30px; text-align: center">
              <small style="font-size: 12px"
                >Write us at
                <a href="mailto:--">info@pentagonpackaging.pk</a> in
                case of any inconvenience.</small
              >
            </p>
            <p style="text-align: center">
              <small style="font-size: 12px"
                >&copy; 2023 - All rights reserved by PentagonPackaging.com</small
              >
            </p>
          </td>
        </tr>
      </table>
    </div>

      `,
    };
    const mailOptions1 = {
      from: emailConfig.user,
      to: email,
      subject: 'Your New Order On Pentagon Packaging',
      html: `
    Thank you for visiting! Your custom quote request has been received. Our sales team will prepare and email your custom quote within one business day. Sales & Support Team https://www.pentagonpackaging.com

      `,
    };


    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions1);

    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};