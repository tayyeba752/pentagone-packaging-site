import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Label } from "@mui/icons-material";
import { useState } from "react";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import imge from "../../Assete/images/Home/Apparel.png";
import imge1 from "../../Assete/images/Home/Lid and Folding Box.png";
import Navbar from "../../NavFoot/NavBar/Navbar";
import Footer from "../../NavFoot/Footer/Footer";
import Quote from "../../CombineComp/Quote";
import ServiceSecond from "../Home/ServiceSecond";
import { Helmet } from "react-helmet";
import Env from "../../Environments/Env"

const GetQuote = () => {
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>PentagonPackaging - GetQuote</title>
          <link rel="canonical" href={`${Env.link}/GetQuote`} />
          <meta
            name="description"
            content="PentagonPackaging, is just a click away! Find cheap and quality custom packaging and custom printed boxed along with your own packaging design."
          />
          <meta
            property="og:title"
            content="Pentagon Packaging: Buy the Best Custom Packaging Boxes"
          />
          <meta
            name="keywords"
            content="Pentagon Packaging: Buy the Best Custom Packaging Boxes"
          />
        </Helmet>
      </div>
      <div className="bg-white">
        <Navbar />
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} md={0.5}>
          </Grid>
          <Grid item xs={12} md={5} style={{ textAlign: 'left', margin: "10px" }}>
            <h2>Request a Free Quote & Consultation</h2>
            <p>Refine Packaging stands for quality, transparency, and excellence for every customer. Fill out our quote request form, and we’ll reply to your message within 24 hours or less!</p>
            <p>Refine Packaging stands for quality, transparency, and excellence for every customer. Fill out our quote request form, and we’ll reply to your message within 24 hours or less! Refine Packaging stands for quality, transparency, and excellence for every customer. Fill out our quote request form, and we’ll reply to your message within 24 hours or less!</p>
          </Grid>
          <Grid item xs={12} md={0.5}>
          </Grid>
          <Grid item xs={12} md={5} style={{ margin: "10px" }}>
            <img src={imge} style={{ height: "400px", width: "100%" }} alt="Your Alt Text" />
          </Grid>
          <Grid item xs={12} md={1.5}>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} md={0.5}>
          </Grid>
          <Grid item xs={12} md={10}>
            <ServiceSecond />
          </Grid>



          <Grid item xs={12} md={0.5}>
          </Grid>
        </Grid>

      </div>
      <Footer />

    </>
  );
};

export default GetQuote;
