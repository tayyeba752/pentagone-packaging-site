import React, { useState, useEffect, useRef } from "react";
import Footer from "../../NavFoot/Footer/Footer";
import Navbar from "../../NavFoot/NavBar/Navbar";
import "./css/Home.css";
import img1 from "../../Assete/images/navbar/R2/sweet.png";
import Product from "./Product";
// import img1 from "../../Assete/images/slideshow/medium-shot-business-women-high-five.jpeg";
import img2 from "../../Assete/images/slideshow/team-meeting-renewable-energy-project.jpeg";
import img3 from "../../Assete/images/slideshow/two-business-partners-working-together-office-computer.jpeg";
import bgIMG from "../../Assete/images/Home/img1.jpg";
import Table from "./Table";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

import {
  Container,
  TextField,
  Button,
  Modal,
  Box,
  Link,
  Typography,
  IconButton,
  Grid,
  TextareaAutosize,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import modalImg from "../../Assete/2.png";
import Detail1 from "./Detail1/Detail1";
// import  img4 from"../../Assete/images/whatsapplogo.jpg";
// import ContactUs from "../Contact/ContactUs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav2 from "../../NavFoot/NavBar/Nav2";
import { useNavigate } from "react-router-dom";
import ServicesHome from "./ServicesHome";
import ServiceSecond from "./ServiceSecond";
import HowToOrder from "./HowToOrder";
import axios from "axios";
import Env from "../../Environments/Env";
import { getAsset } from "../../utils/helper";
import Product2 from "./Product2";
import Product3 from "./Product3";
import { Helmet } from "react-helmet";

const CustomPrevArrow = (props) => (
  <button {...props} className="slick-arrow slick-prev">
    Previous
  </button>
);

const CustomNextArrow = (props) => (
  <button {...props} className="slick-arrow slick-next">
    Next
  </button>
);


const Home = () => {
  const [allGetHeaderImg, setAllGetHeaderImg] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const responsiveOptions = {
    0: {
      items: 1, // show one item on extra small screens (xs)
    },
    600: {
      items: 1, // show one item on small screens (sm)
    },
    900: {
      items: 2,
    },
    1000: {
      items: 3, // adjust the number of items for larger screens if needed
    },
  };

  const textArray = ["Gift Box", "Kraft box", "Bakery Box"];
  const images = [
    // Replace these paths with your correct image paths
    "../../Assete/images/slideshow/team-meeting-renewable-energy-project.jpeg",
    "../../Assete/images/slideshow/two-business-partners-working-together-office-computer.jpeg",
    "../../Assete/images/slideshow/team-meeting-renewable-energy-project.jpeg",
  ];

  // "../../Assete/images/Landing/1.jpg",
  //   "../../Assete/images/Landing/2.jpg",
  //   "../../Assete/images/Landing/3.jpg",

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust the autoplay speed as needed (in milliseconds)
    arrows: true,
    prevArrow: <CustomPrevArrow />, // Custom left arrow component
    nextArrow: <CustomNextArrow />, // Custom right arrow component
  };

  const [textIndex, setTextIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [openModalFirst, setOpenModalFirst] = useState(false);

  useEffect(() => {
    GetAllImgHeader();
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayIndex(
        (prevIndex) => (prevIndex + 1) % (textArray[textIndex].length + 1)
      );
      // If all characters of the current line are displayed, switch to the next line
      if (displayIndex === textArray[textIndex].length) {
        setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        setDisplayIndex(0); // Reset displayIndex when switching to a new line
      }
    }, 300);

    return () => clearInterval(interval);
  }, [textArray, textIndex, displayIndex]);

  // let images = [img1]; 
  const GetAllImgHeader = (img) => {
    axios.get(`${Env.server}/api/header/headerImgGet`)
      .then((res) => {
        setAllGetHeaderImg(res.data.header.img);
      })
      .catch((err) => {
        console.log("abc----", err);
      })
  }

  const CloseModal = () => {
    setOpenModalFirst(false);
  };


  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>PentagonPackaging </title>
          <link rel="canonical" href={`${Env.link}`} />
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
      <Navbar />
      {/* <Nav2 /> */}

      <div con id="home-v3" class="landing-page">
        <div className="bgImg">
          <div className="row">
            <div className="landing-page1" style={{ width: "100%" }}>
              <Slider {...settings}>
                {allGetHeaderImg.map((image, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={getAsset(image)}
                      alt={`Slide ${index + 1}`}
                      className="overlay-image"
                      style={{ width: "100%" }}
                    />
                  </div>
                ))}
              </Slider> 
            </div>
            <div style={{ backgroundColor: "#009688", height: "50px", color: "white", fontSize: "25px", paddingTop: "10px" }}>
              <marquee direction="left" behavior="scroll" scrollamount="13"><b style={{ color: "black" }}>"Hurry Up! </b><b style={{ color: "yellow" }}>20% discout</b> to our new clients.<clients className=""></clients>"
              </marquee>
            </div>
            <Grid container spacing={2} >
              <Grid  item xs={12} sm={12}>
                <Detail1 /> 
              </Grid> 
            </Grid> 
            <Product />  
            <HowToOrder />
            <ServiceSecond />
            <Product2 />
            <Product3/> 
          </div>
        </div>
      </div>
      <div>



        <Modal
          open={openModalFirst}
          onClose={CloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid transparent",
              borderRadius: "7px",
              maxHeight: "90vh", // Limiting maximum height for scroll
              overflowY: "auto", // Enable vertical scroll when content exceeds maxHeight
              width: "70%",
              boxShadow: 24,
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton className="closeModalIcon" onClick={CloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <center>
              <Typography id="modal-title" variant="h4" component="h2">
                <b style={{ color: "#158bab" }}>Welcome to the Pentagon Peckaging</b>
                <div className="line"></div>
              </Typography>
              <Container>
                <br />
                <Grid container spacing={7} style={{ padding: "15px" }}>
                  <Grid item xs={12} sm={5}>
                    <div>
                      <img src={modalImg} />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div style={{ textAlign: "left", textAlign: "justify" }} >
                      We are delighted to welcome you to our packaging haven,
                      where innovation meets quality. At Pentagon, we understand
                      the integral role packaging plays in safeguarding and
                      enhancing your products. Our commitment is to provide
                      tailored packaging solutions that not only meet but exceed
                      your expectations. Explore our range of premium packaging
                      services designed to elevate your brand and ensure the
                      utmost protection for your valuable goods. Thank you for
                      choosing Pentagon - where every package tells a story of
                      excellence.
                    </div>
                    <div class="bannder-btn">
                      <a
                        class="btn btn-primary"
                        style={{
                          marginRight: "20px",
                          fontSize: "15px",
                          backgroundColor: "#31c9f7",
                        }}
                      >
                        Visit Our Products
                      </a>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </center>
            {/* <Button onClick={closeAddBlogModal}>Close Modal</Button> */}
          </Box>
        </Modal >

      </div >


      <Footer />
    </>
  );
};
export default Home;
