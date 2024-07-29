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
import { useNavigate } from "react-router-dom";
import "./css/Product.css";
import axios from "axios";
import Env from "../../Environments/Env";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAsset } from "../../utils/helper";


const Product2 = () => {
    const navigate = useNavigate();
    const [GetProduct, setGetProd] = useState([]);
    const [IndusHead, setIndusHead] = useState("");


    useEffect(() => {
        getBlogs();
        getAllHeadContent()
    }, []);

    const getAllHeadContent = () => {
        axios.get(`${Env.server}/api/homepage/getAll`)
            .then((res) => {
                let da = res.data.hoempage;
                setIndusHead(da.IndusHead);
            })
            .catch((err) => {
                console.log("err----", err);
            })

    }
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
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    style={{ backgroundColor: "White" }}
                >
                    <div className="d-flex justify-content-between" style={{height:"60px"}}>
                        <div className="ms-5 mt-3">
                            <span className="headiPro">Categories:-</span>
                        </div>
                        <div className="seemoreHead">

                        </div>
                    </div>
 

                    
                    <body className="body" style={{ backgroundColor: "White" , height:"auto" , maxHeight:"370px" }} >
                        <div class="container">
                            <div class="brands">
                                <div class="brands__preWrapper">
                                    <div class="brands__wrapper"> 
                                        <div className="product-container" style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>

                                        {GetProduct.map((product, index) => (
                                            <div key={index} className="mr-4 me-4">
                                                <div onClick={() => singlcomponent(product.category, product.title)} className="section-type-box" style={{ height: "340px", width: "250px", cursor: "pointer" }}>
                                                    <a>
                                                        <img
                                                            src={getAsset(product?.image[0])}
                                                            alt={product.title}
                                                            style={{ height: "230px", width: "100%" }}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>





                </Grid>
            </Grid >
        </>
    );
}
export default Product2;