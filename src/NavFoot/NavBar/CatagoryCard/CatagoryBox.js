import React from "react";
import Navbar from "../Navbar";
import Quote from "../../../CombineComp/Quote";

import { useParams, useHistory } from 'react-router-dom';
import Env from "../../../Environments/Env";
import axios from 'axios';
import { useState, useEffect } from "react";
import { getAsset } from '../../../utils/helper';
import Footer from "../../Footer/Footer";
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify'; 
import { useNavigate } from "react-router-dom";


const CatagoryBox = () => {
    const navigate = useNavigate();
    const { id, title } = useParams();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [getDataPro, setGetDataPro] = useState([]);
    const [GetProduct, setGetProd] = useState([]);

    let ID = id;
    useEffect(() => {
        console.log(ID);
        getProductById();
    }, [id])
    useEffect(() => {
        getProductById();
        getBlogs();
    }, [])
    const singlcomponent = (idd, title) => {
        navigate(`/Catagory/${idd}/${title}`);
    }
    const getProductById = () => {
        axios.get(`${Env.server}/api/catagory/getOne/${id}`)
            .then((res) => {
                if (res.data.message === "Success") {
                    setGetDataPro(res.data.catagori[0]);
                }
            })
            .catch((err) => {
                console.log("abc====>>>", err);
            })
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


    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`PentagonPackaging - ${getDataPro.category}`}</title>
                    <link rel="canonical" href={`${Env.link}/Catagory/${id}/${title}`} />
                    <meta
                        name="description"
                        content={getDataPro.mataDescription}
                    />
                    <meta
                        property="og:title"
                        content={getDataPro.mataTitle}
                    />
                    <meta
                        name="keywords"
                        content={getDataPro.FocusKeyWords}
                    />
                </Helmet>
            </div>

            <div className='bg-white'>
                <Navbar />
                <div className="bodyBox container">
                    <div className="container mt-5 mb-5">
                        <div className="row container justify-content-center">
                            <div className="col-lg-7" style={{ textAlign: "justify" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ flex: 1 }}>
                                        <center>
                                            <div style={{ height: "400px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img
                                                    src={getDataPro?.image ? getAsset(getDataPro.image[selectedImageIndex]) : ''}
                                                    alt="pentagon_img"
                                                    style={{ height: "100%", width: "auto", maxWidth: "100%", borderRadius: "10px" }}
                                                />
                                            </div>
                                        </center>
                                    </div>
                                    <div style={{ marginLeft: "20px" }}>
                                        {getDataPro?.image && (
                                            <div>
                                                {getDataPro.image.slice(0, 4).map((img, index) => (
                                                    <div key={index} style={{ marginBottom: "5px" }}>
                                                        <img
                                                            src={getAsset(img)}
                                                            alt={`small_img_${index}`}
                                                            style={{ height: "100px", width: "150px", objectFit: "cover", borderRadius: "5px", cursor: "pointer" }}
                                                            onClick={() => handleImageClick(index)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 mb-5">
                                {/* Display smaller images with onClick event */}
                                <br />
                                <h2 className='fw-bold' style={{ color: "#2ab8e1" }}>{getDataPro?.title}</h2>
                                {/* <p>{getDataPro?.description}</p> */}
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getDataPro?.description) }} />
                                {/* <Quote /> */}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bodyBox">
                    <div className="container mt-5 mb-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-12" style={{ textAlign: "justify" }}>
                                <div className="row type-cat m-5" id="allproduct-section">
                                    {GetProduct.slice(0, 4).map((product, index) => (
                                        <div key={index} className="col-md-3 col-sm-6 mb-4"> {/* Change col-md-4 to col-md-3 */}
                                            <div onClick={() => singlcomponent(product.category, product.title)} className="section-type-box" style={{ height: "340px", width: "100%", cursor: "pointer" }}>
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mb-5">
                    <div className="row container">


                        <div className="col-lg-8" style={{ textAlign: "justify" }}>

                            <div>
                                <h2 className='fw-bold' style={{ color: "#2ab8e1" }}>Detail:</h2>
                                {/* <h2 className='fw-bold' style={{ color: "#2ab8e1" }}>{getDataPro?.title}</h2> */}

                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getDataPro?.description2) }} />
                            </div>
                        </div>
                        <div className="col-lg-4" style={{ textAlign: "justify" }}>
                            <div style={{ marginBottom: "30px" }}>
                                <Quote />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default CatagoryBox;