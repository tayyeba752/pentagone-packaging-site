import {
  Container,
  TextField,
  Button,
  Modal,
  Box,
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
import Navbar from "../../NavFoot/NavBar/Navbar";
import Footer from "../../NavFoot/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { getAsset } from "../../utils/helper";
import "./product.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Env from "../../Environments/Env";
import { Helmet } from "react-helmet";

const Products = () => {
  const navigate = useNavigate();
  const [GetProduct, setGetProd] = useState([]);
  const [GetProduct1, setGetProd1] = useState([]);
  const [GetProduct2, setGetProd2] = useState([]);


  useEffect(() => {
    // getBlogs();
    getIndustries();
    getCategories();
  }, []);


  const getCategories = () => {
    axios.get(`${Env.server}/api/category/getAll`)
      .then((resp) => {
        console.log("Categories response:", resp.data);
        let res = resp.data.catagory; // Typo: Should be resp.data.category
        setGetProd(prevState => [...prevState, ...res]);
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      })
  }

  const getIndustries = () => {
    axios.get(`${Env.server}/api/industry/getAll`)
      .then((resp) => {
        console.log("Industries response:", resp.data);
        let res = resp.data.industries;
        setGetProd(prevState => [...prevState, ...res]);
      })
      .catch((err) => {
        console.log("Error fetching industries:", err);
      })
  }
  const singlcomponent = (id, title, data) => {
    // Convert the product data into a JSON string
    const productData = JSON.stringify(data);

    // Store the product data in the local storage
    localStorage.setItem("openproduct", productData);

    // Navigate to the specified route
    navigate(`/Productopen/${title}/${id}`);
  }


  // const getBlogs = () => {
  //   axios.get(`${Env.server}/api/product/getAllProduct`)
  //     .then((resp) => {
  //       console.log("Blogs response:", resp.data);
  //       let res = resp.data.products;
  //       setGetProd(prevState => [...prevState, ...res]);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching blogs:", err);
  //     })
  // }




  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>PentagonPackaging - Products</title>
          <link rel="canonical" href={`${Env.link}/products`} />
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
        <Grid container spacing={2} >
          <Grid
            item
            xs={12}
            sm={12}
          >
            <Typography
              variant="h2"
              gutterBottom
              className="fw-bold"
              style={{ margin: "20px", color: "#73ddfa" }}
            >
              Products:
            </Typography>
            <div className="row type-cat m-5" id="allproduct-section">
              {GetProduct.map((product, index) => (
                <div  key={index} className="col-md-3 col-sm-6 mb-4">
                  <div onClick={() => singlcomponent(product.industry, product.title , product)} className="section-type-box" style={{ height: "340px", width: "100%", cursor: "pointer" }}>
                    <a>
                      <img
                        src={getAsset(product?.image[0])}
                        alt={product.title}
                        style={{ height: "230px", width: "100%", }}
                      />
                      <div className="section-type-box-des">
                        <center><p style={{ fontSize: "17px", fontWeight: "bolder" }}>{product.title}</p></center>
                        <center><button style={{ backgroundColor: "#1ea9d3", color: "white", borderRadius: "10px", fontWeight: "bolder" }}  >Get a Quote</button></center>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="row type-cat m-5" id="allproduct-section">
              {GetProduct.slice(0, 4).map(product => (
                <>
                  
                <div key={product._id} className="col-md-3 col-sm-6 mb-4">
                  <div onClick={() => singlcomponent(product._id, product.title)} className="section-type-box" style={{ height: "440px", width: "100%" }}>
                    <a>
                      <img
                        src={getAsset(product?.image[0])}
                        alt={product.Title}
                        style={{ height: "250px", width: "100%" }}
                      />
                      <div className="section-type-box-des">
                        <h3 style={{ color: "#25abd0" }}>{product.title}</h3>
                        <p className="description">{product.description}</p>
                      </div>
                      <div className="text-info" style={{ position: "absolute", bottom: 5, cursor: "pointer", right: 30 }}>
                        See more <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                      </div>
                    </a>
                  </div>
                </div>
                </>
              ))}
            </div> */}
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
export default Products;