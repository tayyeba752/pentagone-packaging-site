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

const CatagoriesNav = () => {
    const navigate = useNavigate();
    const [GetProduct, setGetProd] = useState([]);
    useEffect(() => {
        getBlogs();
    }, []);

    const singlcomponent = (id, title) => {
        navigate(`/Catagory/${id}/${title}`);
    }
    const getBlogs = () => {
        axios.get(`${Env.server}/api/catagory/getAll`)
            .then((resp) => {
                let res = resp.data.catagory;
                setGetProd(res);
            })
            .catch((err) => {
                console.log("err", err);
            })
    }




    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>PentagonPackaging - Categories</title>
                    <link rel="canonical" href={`${Env.link}/Catagories`} />
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
                            Catagories:
                        </Typography>
                      
                        <div className="row type-cat m-5" id="allproduct-section">
                            {GetProduct.map((product, index) => (
                                <div key={index} className="col-md-3 col-sm-6 mb-4">
                                    <div onClick={() => singlcomponent(product._id, product.title)} className="section-type-box" style={{ height: "340px", width: "100%", cursor: "pointer" }}>
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
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    );
}
export default CatagoriesNav;