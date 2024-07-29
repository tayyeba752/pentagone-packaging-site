import React from "react";
import Navbar from "../Navbar";
import Quote from "../../../CombineComp/Quote";
import DOMPurify from 'dompurify';
import { useNavigate, useParams } from 'react-router-dom';
import Env from "../../../Environments/Env";
import axios from 'axios';
import { useState, useEffect } from "react";
import { getAsset } from '../../../utils/helper';
import Footer from "../../Footer/Footer";
import { Helmet } from "react-helmet";
const OtherBox = () => {
    const { id, title } = useParams();
    const navigate = useNavigate();
    const [getDataPro, setGetDataPro] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); 



    useEffect(() => {
        getProductById();
    }, [])
    let ID = id;
    useEffect(() => {
        console.log(ID);
        getProductById();
    }, [id])

    const singlcomponent = (id, title) => {
        navigate(`/Catagory/${id}/${title}`);
    }

    


    const getProductById = () => {
        axios.get(`${Env.server}/api/other/getOne/${id}`)
            .then((res) => {
                if (res.data.message === "Success") {
                    setGetDataPro(res.data.industries); 
                    // console.log("Abc=====abc===abc", res.data.industries._id);
                }
            })
            .catch((err) => {
                console.log("abc====>>>", err);
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
                    <title>{`PentagonPackaging - ${getDataPro.other}`}</title>
                    <link rel="canonical" href={`${Env.link}/Other/${id}/${title}`} />
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
                        <div className="row justify-content-center">
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
                                    <div className=" " style={{ marginLeft: "20px" }}>
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
            </div>
            <Footer />
        </>
    );
}
export default OtherBox;