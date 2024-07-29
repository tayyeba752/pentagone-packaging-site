import React from "react";
import Navbar from "../Navbar";
import Quote from "../../../CombineComp/Quote";
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import Env from "../../../Environments/Env";
import axios from 'axios';
import { useState, useEffect } from "react";
import { getAsset } from '../../../utils/helper';
import Footer from "../../Footer/Footer";
import { Helmet } from "react-helmet";

const MaterialBox = () => {
    const { id, title } = useParams();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [getDataPro, setGetDataPro] = useState([]);
    useEffect(() => {
        getProductById();
    }, [])
    let ID = id;
    useEffect(() => {
        console.log(ID);
        getProductById();
    }, [id])
    const getProductById = () => {
        axios.get(`${Env.server}/api/material/getOne/${id}`)
            .then((res) => {
                if (res.data.message === "Success") {
                    setGetDataPro(res.data.material[0]);
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
                    <title>{`PentagonPackaging - ${getDataPro.material}`}</title>
                    <link rel="canonical" href={`${Env.link}/Material/${id}/${title}`} />
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
                <div className="bodyBox">
                    <div className="container mt-5 mb-5">
                        <div className="row ">
                            <div className="col-lg-8" style={{ textAlign: "justify" }}>
                                <div>
                                    <center>
                                        <div style={{ height: "350px" }}>
                                            <img
                                                src={getDataPro?.image ? getAsset(getDataPro.image[selectedImageIndex]) : ''}
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
                                    <h2 className='fw-bold' style={{ color: "#2ab8e1" }}>{getDataPro?.title}</h2>
                                    {/* <p>{getDataPro?.description}</p> */}
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getDataPro?.description) }} />
                                </div>
                            </div>
                            <div className="col-lg-4 mb-5">
                                {/* Display smaller images with onClick event */}

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
export default MaterialBox;