

import React, { useEffect, useState } from 'react';
import Quote from '../../CombineComp/Quote';
import Navbar from '../../NavFoot/NavBar/Navbar';
import Footer from '../../NavFoot/Footer/Footer';
import img1 from "../../Assete/2.png";
import { useParams } from 'react-router-dom';
import Env from "../../Environments/Env";
import axios from 'axios';
import { getAsset } from '../../utils/helper';
import { Helmet } from "react-helmet";



const Productopen = () => {
    const { title, id } = useParams();
    const [getDataPro, setGetDataPro] = useState([]);
    const [getDaa, setgetDaa] = useState(localStorage.getItem("openproduct"));

    useEffect(()=>{
        console.log(localStorage.getItem("openproduct"))
        setgetDaa(localStorage.getItem("openproduct"))
    },[])

    useEffect(() => {
        getProductById();
    }, [])
    useEffect(() => {
        console.log(" ", id)
    }, [id]);

    useEffect(() => {
        console.log(" ", id)
    }, [title]);

    const getProductById = () => {
        axios.get(`${Env.server}/api/industry/getSingleProduct/${id}`)
            .then((res) => {
                if (res.data.message === "Success") {
                    setGetDataPro(res.data.data[0]);
                }
            })
            .catch((err) => {
                console.log("abc====>>>", err);
            })
    }


    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`PentagonPackaging - ${getDaa.title}`}</title>
                    <link rel="canonical" href={`${Env.link}/Productopen/${id}/${title}`} />
                    <meta
                        name="description"
                        content={getDaa.mataDescription}
                    />
                    <meta
                        property="og:title"
                        content={getDaa.mataTitle}
                    />
                    <meta
                        name="keywords"
                        content={getDaa.FocusKeyWords}
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
                                    <img src={getAsset(getDaa && getDaa.image && getDaa.image[0])} alt="pentagon_img" style={{ height: "450px", width: "730px", borderRadius: "10px" }} />

                                </div>
                                <br />
                                <div>
                                    <h2 className='fw-bold' style={{ color: "#2ab8e1" }}>{title}</h2>
                                    <p>
                                        {getDaa?.description} 
                                    </p> 
                                </div>
                            </div>
                            <div className="col-lg-4 mb-5">
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
export default Productopen;