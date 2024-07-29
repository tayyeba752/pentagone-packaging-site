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


const Product = () => {
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
        navigate(`/GetaQuote/${id}/${title}`);
    }
    const getBlogs = () => {
        axios.get(`${Env.server}/api/industry/getAll`)
            .then((resp) => {
                let res = resp.data.industries;
                setGetProd(res);
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    style={{ backgroundColor: "White", marginTop: "5%" }}
                >
                    <div className="d-flex justify-content-between">
                        <div className="ms-5 mt-3">
                            <span className="headiPro">{IndusHead}</span>
                        </div>
                        <div className="seemoreHead">
                            <Link to="/products" ><h5
                                style={{ color: "#1b80ad", marginRight: "30px" }}
                            >
                                Visit Products <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </h5></Link>
                        </div>
                    </div>

                  
                    <div className="row type-cat m-5" id="allproduct-section">
                        {GetProduct.slice(0, 8).map((product, index) => (
                            <div key={index} className="col-md-3 col-sm-6 mb-4">
                                <div onClick={() => singlcomponent(product._id, product.title)} className="section-type-box" style={{ height: "340px", width: "100%", cursor: "pointer" }}>
                                    <a>
                                        <img
                                            src={getAsset(product?.image[0])}
                                            alt={product.title}
                                            style={{ height: "240px", width: "100%" }}
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
            </Grid >
        </>
    );
}
export default Product;