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


const Product3 = () => {
    const navigate = useNavigate();
    const [GetProduct, setGetProd] = useState([]);
    const [lastSectionHead, setlastSectionHead] = useState("");
    const [lastSectionDetail, setlastSectionDetail] = useState("");
    const [lastSectionDetailleft, setlastSectionDetailleft] = useState("");
    const [Images, setImages] = useState([]);
    

    useEffect(() => {
        getBlogs();
        getAllHeadContent();
    }, []);

    

    const getAllHeadContent = () => {
        axios.get(`${Env.server}/api/homepage/getAll`)
            .then((res) => {
                let da = res.data.hoempage;
                setlastSectionHead(da.lastSection);
                setlastSectionDetail(da.lastSectionDetail);
                setlastSectionDetailleft(da.lastSectionDetailleft)
                setImages(da.imageHowToOrder);
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
          

                    {/* <p className="container ms-3" style={{ textAlign: "justify" }}>

                        Pentagone: Elevate your with, a sleek and innovative [type of product]. Designed for [target audience], it boasts [key features, e.g., durability, efficiency] and adds a touch of style to your [setting]. Experience excellence in [industry or lifestyle] with Pentagone's [Product Name].
                    </p> */}
            <div className="container mt-5 mb-5">
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-sm-10">
                            <div className="text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-6">
                                            <img className="w-100 shadow" style={{ maxHeight: "175px", maxWidth: "100%", borderRadius: "10px" }} src={getAsset(Images[4])} alt="Image 1" />
                                        </div>
                                        <div className="col-6">
                                            <img className="w-100 shadow" style={{ maxHeight: "175px", maxWidth: "100%", borderRadius: "10px" }} src={getAsset(Images[5])} alt="Image 2" />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <img className="w-100 shadow" style={{ maxHeight: "175px", maxWidth: "100%", borderRadius: "10px" }} src={getAsset(Images[6])} alt="Image 3" />
                                        </div>
                                        <div className="col-6">
                                            <img className="w-100 shadow" style={{ maxHeight: "175px", maxWidth: "100%", borderRadius: "10px" }} src={getAsset(Images[7])} alt="Image 4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="manual mt-4">
                                    <p className="lead" dangerouslySetInnerHTML={{ __html: lastSectionDetailleft }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-8 col-sm-10 mt-md-0">
                            <div className="text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-6">
                                            <img className="w-100 shadow" style={{ maxHeight: "175px", maxWidth: "100%", borderRadius: "10px" }} src={getAsset(Images[8])} alt="Image 5" />
                                        </div>
                                        <div className="col-6">
                                            <img className="w-100 shadow" style={{ maxHeight: "175px", maxWidth: "100%", borderRadius: "10px" }} src={getAsset(Images[9])} alt="Image 6" />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <img className="w-100 shadow" style={{ maxHeight: "175px", maxWidth: "100%", borderRadius: "10px" }} src={getAsset(Images[10])} alt="Image 7" />
                                        </div>
                                        <div className="col-6">
                                            <img className="w-100 shadow" style={{ maxHeight: "175px", maxWidth: "100%", borderRadius: "10px" }} src={getAsset(Images[11])} alt="Image 8" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 mt-4">
                                    <h2 className="display-4" style={{ color: "#1c77b4" }} dangerouslySetInnerHTML={{ __html: lastSectionHead }} />
                                    <p className="lead" dangerouslySetInnerHTML={{ __html: lastSectionDetail }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

 
        </>
    );
}
export default Product3;