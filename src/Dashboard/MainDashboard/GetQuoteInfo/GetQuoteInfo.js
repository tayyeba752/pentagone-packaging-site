import React, { useState, useEffect, useRef } from "react";
import "./GetQuoteInfo.css";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    CardMedia,
    Grid,
    Card,
    CardContent,
    Modal,
    Box,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Env from "../../../Environments/Env";
import Navbar from "../../DDNav/NavBar/DDNavbar";
import { getAsset } from "../../../utils/helper";


const GetQuoteInfo = () => {
    const navigate = useNavigate();
    const [blogModalOpen, setBlogModalOpen] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [allGetQuoteFormData, setAllGetQuoteFormData] = useState([]);
    let number = 0;
    useEffect(() => {
        GetAllImgHeader();
    }, [blogModalOpen]);

    const closeAddProductModal = () => {
        setBlogModalOpen(false);
    };

    const GetAllImgHeader = () => {
        axios
            .get(`${Env.server}/api/quoteform/getAllQuotesForm`)
            .then((res) => {
                setAllGetQuoteFormData(res.data.quoteforms);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    };


    const handleCardClick = (quote) => {
        setSelectedQuote(quote);
        setBlogModalOpen(true);
    };

    const handleDownloadImage = () => {
        const imageUrl = getAsset(selectedQuote?.images[0]);

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'downloaded_image.png'; // You can customize the downloaded file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="bg-white body">
                <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <Navbar />
                </div>
                <div style={{ marginTop: "100px" }}>
                    <div className="container m-4 justify-content-center">
                        <h2 className="mb-4" style={{ marginTop: "50px" }}>
                            All Quotes:-
                        </h2>
                        <Grid container spacing={3} style={{ cursor: "pointer" }}>
                            {allGetQuoteFormData.map((quote, index) => (
                                <Grid item key={quote._id} xs={12} sm={6} md={4} lg={3}>
                                    <Card onClick={() => handleCardClick(quote)}>
                                        <CardContent>
                                            <span className="d-flex">
                                                <span>{number = number + 1})</span>&nbsp;&nbsp;&nbsp;
                                                <Typography variant="h4" component="div">
                                                    <span style={{ color: "#1f98ba" }}>{quote.name}</span>
                                                </Typography>
                                            </span>
                                            <Typography variant="h6" color="textSecondary">
                                                <b style={{ fontSize: "15px" }}>Number:</b> {quote.phNum}
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary">
                                                <b style={{ fontSize: "15px" }}>Email:</b> {quote.email}
                                            </Typography>
                                        </CardContent>
                                        <CardMedia
                                            component="img"
                                            alt="Image"
                                            height="140"
                                            image={getAsset(quote?.images[0])} // Replace with the actual image URL or source
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div className="container m-4 justify-content-center">
                        {/* Additional content or sections if needed */}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal open={blogModalOpen} onClose={closeAddProductModal}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, bgcolor: "background.paper", borderRadius: "10px", boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="div">
                        {selectedQuote && (
                            <>
                                <h3 style={{ color: "#1f98ba" }}>{selectedQuote.name}</h3>
                                <IconButton
                                    aria-label="close"
                                    onClick={closeAddProductModal}
                                    sx={{ position: "absolute", right: 8, top: 8 }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </>
                        )}
                    </Typography>
                    {selectedQuote && (
                        <>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}> Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span> {selectedQuote.email}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}> Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {selectedQuote.phNum}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}>  Product Info:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {selectedQuote.productInfo}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}>  Color:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {selectedQuote.color}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}>   Unit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {selectedQuote.units}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}>  Length:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {selectedQuote.length}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}>  Width:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {selectedQuote.width}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}>  Depth:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {selectedQuote.depth}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <span style={{ color: "#30c5f3" }}>  Stocks:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {selectedQuote.stock}
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="Image"
                                height="200"
                                image={getAsset(selectedQuote?.images[0])} // Replace with the actual image URL or source
                            />
                            <br />
                            <button onClick={handleDownloadImage}>Download Image</button>
                            {/* Add more details as needed */}
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};
export default GetQuoteInfo;
