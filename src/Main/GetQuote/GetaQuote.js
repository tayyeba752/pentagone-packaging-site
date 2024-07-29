import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Label } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import imge from "../../Assete/images/Home/Apparel.png";
import imge1 from "../../Assete/images/Home/Lid and Folding Box.png";
import Navbar from "../../NavFoot/NavBar/Navbar";
import Footer from "../../NavFoot/Footer/Footer";
import Quote from "../../CombineComp/Quote";
import ServiceSecond from "../Home/ServiceSecond";
import "./GetAQuote.css";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { getAsset } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import Env from "../../Environments/Env";
import DOMPurify from 'dompurify';
import { Helmet } from "react-helmet";


const GetaQuote = () => {
    const { id, title } = useParams();
    const [getDataPro, setGetDataPro] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const navigate = useNavigate();
    const [GetProduct, setGetProd] = useState([]);
    useEffect(() => {
        getBlogs();
    }, []);

    useEffect(() => {
        getProductById();
    }, [])


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
    let ID = id;

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const getProductById = () => {
        console.log(`${Env.server}/api/industry/getOne/${id}`)
        axios.get(`${Env.server}/api/industry/getOne/${id}`)
            .then((res) => {
                if (res.data.message === "Success") {
                    setGetDataPro(res.data.industries);
                }
            })
            .catch((err) => {
                console.log("abc====>>>", err);
            })
    }

    const style = {
        backgroundColor: "#0890a6e3",
        color: "white",
        fontSize: "bold",
        paddingLeft: "10px",
        borderRadius: "10px",
        cursor: "pointer",
        height: "auto",
        marginTop: "6px"
    }
    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>PentagonPackaging - GetQuote</title>
                    <link rel="canonical" href={`${Env.link}/GetaQuote/${id}/${title}`} />
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


                <Grid container spacing={1} style={{ marginTop: "10px" }}>
                    <Grid item xs={12} md={3} >
                        <section class="prdct-page">
                            <div class="container">
                                <div class="row mt-5" style={{ border: "1px solid black", borderRadius: "10px", margin: "1px" }}>
                                    <center><h3 style={{ color: "#2ab8e1" }}><b>Popular Industries</b></h3></center>
                                    <ul>
                                        {GetProduct?.map((data, index) => (
                                            <span key={index}>
                                                <li style={style} className="d-flex" onClick={() => singlcomponent(data.category, data.title)}  ><b style={{ marginTop: "5px" }}>{data.title}</b></li>
                                            </span>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </section>
                    </Grid>


                  












                    <Grid item xs={12} md={5} >
                        <div style={{ textAlign: "justify" }}>
                            <div>
                                <center>
                                    <div style={{ height: "350px" }}>
                                        <img
                                            src={getAsset(getDataPro?.image && getDataPro.image[selectedImageIndex])}
                                            alt="pentagon_img"
                                            style={{ height: "auto", width: "auto", borderRadius: "10px" }}
                                        />
                                    </div>
                                </center>
                                <br />
                                {getDataPro?.image && (
                                    <div>
                                        {getDataPro.image.slice(0, 4).map((img, index) => (
                                            <img
                                                key={index}
                                                src={getAsset(img)}
                                                alt={`small_img_${index}`}
                                                style={{ height: "100px", width: "150px", borderRadius: "5px", margin: "5px", cursor: "pointer" }}
                                                onClick={() => handleImageClick(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <br />
                            <div>
                                <h2 className='fw-bold' style={{ color: "#2ab8e1", margin: "10px" }}>{title}</h2>
                                <div style={{ margin: "10px" }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getDataPro?.description) }} />
                            </div>
                        </div>
                    </Grid>
















                    <Grid item xs={12} md={4}>
                        <div className="bodyBox">
                            <div className="container mt-5 mb-5">
                                <div className="row ">
                                    <br />
                                    <Quote />
                                </div>
                            </div>
                        </div>
                    </Grid>



                    {/* <Grid item xs={12} md={0.5}>
                    </Grid> */}
                </Grid>

            </div >
            <Footer />

        </>
    );
};

export default GetaQuote;
