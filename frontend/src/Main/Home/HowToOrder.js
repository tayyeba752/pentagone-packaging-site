import React, { useState, useEffect } from 'react';
import "./css/HowToOrder.css";
import axios from 'axios';
import Env from "../../Environments/Env";
import { getAsset } from '../../utils/helper';


const HowToOrder = () => {
    const [howToOrder, setHowToOrder] = useState("");
    const [howToOrderHead, setHowToOrderHead] = useState("");
    const [howToOrderImage, setHowToOrderImage] = useState([]);

    useEffect(() => {
        getAllHeadContent();
    }, []);

    const getAllHeadContent = () => {
        axios.get(`${Env.server}/api/homepage/getAll`)
            .then((res) => {
                let da = res.data.hoempage;
                setHowToOrder(da.howToOrder);
                setHowToOrderHead(da.orderHead);
                setHowToOrderImage(da.imageHowToOrder)
            })
            .catch((err) => {
                console.log("err----", err);
            })
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center" style={{ color: "#1b80ad" }}>
                {/* How to Order? */}
                {howToOrderHead}
            </h2>

            <div className="row justify-content-center">
                <div className='col-lg-5 text-center'> {/* Center the content on mobile */}
                    <div className="d-flex flex-wrap justify-content-center"> {/* Center the images */}
                        <img src={getAsset(howToOrderImage[0])} className="rounded m-1 img" style={{ width: "50%", height: "250px", minWidth: "200px", objectFit: "cover" }} alt="..." />
                        <img src={getAsset(howToOrderImage[1])} className="rounded m-1 img" style={{ width: "50%", height: "250px", minWidth: "200px", objectFit: "cover" }} alt="..." />
                        <img src={getAsset(howToOrderImage[2])} className="rounded m-1 img" style={{ width: "50%", height: "250px", minWidth: "200px", objectFit: "cover" }} alt="..." />
                        <img src={getAsset(howToOrderImage[3])} className="rounded m-1 img" style={{ width: "50%", height: "250px", minWidth: "200px", objectFit: "cover" }} alt="..." />
                    </div>
                </div>
                <div className='col-lg-1 marginLeft'>

                </div>
                <div className='col-lg-5 marginLeft'>
                    <p className='me-4 ms-4 mt-2' style={{ textAlign: "justify" }}>
                        {/* Your text here */}
                        <div dangerouslySetInnerHTML={{ __html: howToOrder }} />
                    </p>
                </div>
            </div>


        </div>
    );
}

export default HowToOrder;
