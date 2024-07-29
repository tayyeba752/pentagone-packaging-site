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

const MaterialsNav = () => {
    const navigate = useNavigate();
    const [GetProduct, setGetProd] = useState([]);
    useEffect(() => {
        getBlogs();
    }, []);

    const singlcomponent = (id, title) => {
        navigate(`/Material/${id}/${title}`);
    }
    const getBlogs = () => {
        axios.get(`${Env.server}/api/material/getAll`)
            .then((resp) => {
                let res = resp.data.material;
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
                    <title>PentagonPackaging - Materials</title>
                    <link rel="canonical" href={`${Env.link}/Materials`} />
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
                            Materials:
                        </Typography>
                        <div className="row type-cat m-5" id="allproduct-section">
                            {GetProduct.map(product => (
                                <div key={product._id} className="col-md-3 col-sm-6 mb-4">
                                    <div onClick={() => singlcomponent(product.material, product.title)} className="section-type-box" style={{ height: "440px", width: "100%" }}>
                                        <a>
                                            <img
                                                src={getAsset(product?.image[0])}
                                                alt={product.Title}
                                                style={{ height: "250px", width: "100%" }}
                                            />
                                            <div className="section-type-box-des">
                                                <h3 style={{ color: "#25abd0" }}>{product.title}</h3>
                                                <p className="description"> <div dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                                            </div>
                                            <div className="text-info" style={{ position: "absolute", bottom: 5, cursor: "pointer", right: 30 }}>
                                                See more <i className="fa fa-angle-double-right" aria-hidden="true"></i>
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
export default MaterialsNav;