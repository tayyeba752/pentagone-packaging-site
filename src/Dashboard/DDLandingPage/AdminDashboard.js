import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./AdminDD.css";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Env from "../../Environments/Env";
import axios from 'axios';
import Footer from '../../NavFoot/Footer/Footer';
import DDNavbar from '../DDNav/NavBar/DDNavbar';

const Box = ({ title, info, BlogNo }) => (
    <Col>
        <Card>
            <Card.Body style={{ height: "200px" }}>
                <Card.Title className="cardTitle"><center>{title}</center></Card.Title>
                <Card.Text style={{ color: "black" }} ><center><span style={{ fontWeight: "bold" }}>{info}</span>&nbsp;<span style={{ color: "#37b2fa", fontWeight: "bold" }}>{BlogNo}</span></center></Card.Text>
            </Card.Body>
        </Card>
    </Col>
);

const AdminDashboard = () => {
    const [ProductNum, setProductNum] = useState(0)
    const [IndustryNum, setIndustryNum] = useState(0)
    const [CatagoryNum, setCatagoryNum] = useState(0)
    const [ShapeNum, setShapeNum] = useState(0)
    const [MaterialNum, setMaterialNum] = useState(0)
    const [QuoteNum, setQuoteNum] = useState(0)

    useEffect(() => {
        NoOfProduct();
        NoOfIndustry();
        NoOfCatagory();
        NoOfShape();
        NoOfSMaterial();
        NoOfSQuote();
    }, [])


    const NoOfProduct = () => {
        axios.get(`${Env.server}/api/product/getAllProduct`)
            .then((resp) => {
                let num = resp.data.products.length;
                setProductNum(num)
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }

    const NoOfIndustry = () => {
        axios.get(`${Env.server}/api/industry/getAll`)
            .then((resp) => {
                let num = resp.data.industries.length;
                setIndustryNum(num)
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }

    const NoOfCatagory = () => {
        axios.get(`${Env.server}/api/catagory/getAll`)
            .then((resp) => {
                let num = resp.data.catagory.length;
                setCatagoryNum(num)
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }

    const NoOfShape = () => {
        axios.get(`${Env.server}/api/shape/getAll`)
            .then((resp) => {
                let num = resp.data.shapes.length;
                setShapeNum(num)
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }

    const NoOfSMaterial = () => {
        axios.get(`${Env.server}/api/material/getAll`)
            .then((resp) => {
                let num = resp.data.material.length;
                setMaterialNum(num)
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }

    const NoOfSQuote = () => {
        axios.get(`${Env.server}/api/quoteform/getAllQuotesForm`)
            .then((resp) => {
                let num = resp.data.quoteforms.length;
                setQuoteNum(num)
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }


    return (
        <>
            <DDNavbar />
            <body style={{ fontFamily: "'Poppins', sans-serif" }} class="ori-digital-studio bg-white">
                <section id="ori-slider-1" style={{ marginTop: "140px", height: "auto" }} class="ori-slider-section-1 position-relative">
                    <Container >
                        <Row>
                            <span style={{ marginBottom: "10px" }}>
                                <Box title="Products" info="Total Products:" BlogNo={`${ProductNum}`} />
                            </span>
                            <span style={{ marginBottom: "10px" }}>
                                <Box title="Industries" info="Total Industries:" BlogNo={`${IndustryNum}`} />
                            </span>
                            <span style={{ marginBottom: "10px" }}>
                                <Box title="Catagories" info="Total Catagories:" BlogNo={`${CatagoryNum}`} />
                            </span>
                            <span style={{ marginBottom: "10px" }}>
                                <Box title="Shapes & Style" info="Total Shapes & Style:" BlogNo={`${ShapeNum}`} />
                            </span>
                            <span style={{ marginBottom: "10px" }}>
                                <Box title="Materials" info="Total Materials:" BlogNo={`${MaterialNum}`} />
                            </span>
                        </Row>
                    </Container>
                </section>
                <section id="ori-slider-1" style={{ marginTop: "20px", height: "500px" }} class="ori-slider-section-1 position-relative">
                    <Container >
                        <Row>
                            <Box title="Quotes" info="Total Quotes:" BlogNo={`${QuoteNum}`} />
                            {/* <Box title="Industries" info="Total Industries:" BlogNo={`${ProductNum}`} />
                            <Box title="Catagories" info="Total Catagories:" BlogNo={`${ProductNum}`} />
                            <Box title="Shapes & Style" info="Total Shapes & Style:" BlogNo={`${ProductNum}`} />
                            <Box title="Materials" info="Total Materials:" BlogNo={`${ProductNum}`} /> */}
                        </Row>
                    </Container>
                </section>
            </body>
            <Footer />
        </>
    );
}

export default AdminDashboard;
