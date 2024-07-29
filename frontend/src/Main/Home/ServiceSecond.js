import Quote from "../../CombineComp/Quote";
import "./css/ServceSecond.css"
import axios from "axios";
import Env from "../../Environments/Env";
import React, { useState, useEffect } from "react";

const ServiceSecond = () => {

    const [quoteOption, setQuoteOption] = useState("");

    useEffect(() => {
        getAllHeadContent();
    }, []);

    const getAllHeadContent = () => {
        axios.get(`${Env.server}/api/homepage/getAll`)
            .then((res) => {
                let da = res.data.hoempage;
                setQuoteOption(da.quoteOption);
            })
            .catch((err) => {
                console.log("err----", err);
            })

    }


    return (
        <div className="bodyBox container">
            <div className="container mt-5 mb-5">
                <div className="row  ">
                    <div className="row  ">
                    <div className="col-lg-8">
                        <div dangerouslySetInnerHTML={{ __html: quoteOption }} />
                    </div>

                    <div className="col-lg-4">
                        <Quote />
                    </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
export default ServiceSecond;