import React, { useState, useEffect, useRef, useMemo } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Container, TextField, Button, Modal, Box, Typography, IconButton, Grid, TextareaAutosize, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';
import JoditEditor from "jodit-react";
import axios from "axios";
import Env from "../../../Environments/Env";
import { Card, CardContent, CardMedia } from '@mui/material';
import DOMPurify from 'dompurify';
import { getAsset } from "../../../utils/helper";
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from "../../DDNav/NavBar/DDNavbar";


const HomePage = () => {
    const navigate = useNavigate();
    const editor = useRef(null);
    const [blogModalOpen, setBlogModalOpen] = useState(false);
    const [imagesFront, setImagesFront] = useState([]);
    const [responseImages, setResponseImages] = useState([]);
    const [image, setImages] = useState("");
    const [allGetHeaderImg, setAllGetHeaderImg] = useState([]);
    const [deleteBlogId, setDeleteBlogId] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);



    const [getAllContentHome, setgetAllContentHome] = useState({});
    const [howToOrder, setHowToOrder] = useState('');
    const [quoteOption, setQuoteOption] = useState('');
    const [IndusHead, setIndusHead] = useState('');
    const [orderHead, setorderHead] = useState('');
    const [lastSection, setlastSection] = useState('');
    const [lastSectionDetail, setlastSectionDetail] = useState('');
    const [lastSectionDetailleft, setlastSectionDetailleft] = useState('');
    





    useEffect(() => {
        getAllContentData();
    }, []);
    useEffect(() => {
        GetAllImgHeader();
        getAllContentData();
    }, [blogModalOpen])

    const closeAddProductModal = () => {
        setBlogModalOpen(false);
    }

    // Header Images Section ============================
    const onDrop = (acceptedFiles) => {
        setImages(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setImagesFront(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    };
    const removeImage = (index) => {
        const updatedImagesfront = [...imagesFront];
        updatedImagesfront.splice(index, 1);
        setImagesFront(updatedImagesfront)

        const updatedImages = [...image];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });
    const handleInsideClick = (e) => {
        e.stopPropagation();
        const isClickable = e.target.tagName === 'DIV' || e.target.tagName === 'INPUT'; // Check if the clicked element is the drop zone or input
        if (isClickable) {
            if (e.target.tagName === 'DIV') {
                document.getElementById('fileInput').click(); // Trigger the file input click event
            }
        }
    };


    const publishImage1 = () => {
        const formData = new FormData();
        formData.append('imagefront', imagesFront);
        image.forEach((img, index) => {
            formData.append(`images`, img);
        });
        let objectNames = [];
        axios.post(`${Env.server}/api/upload/multiple`, formData)
            .then((res) => {
                let resp = res.data.file;
                for (let i = 0; i < resp.length; i++) {
                    objectNames.push("/images/" + resp[i].filename);
                }
                setResponseImages(objectNames);
                if (res.data.message === "imagesSaved") {
                    updateData(objectNames);
                } else {
                    alert("error not in catch")
                }
            })
            .catch((err) => {
                console.log("err------ooo", err)
                alert("catch error");
            })
    }
    const publishImage = () => {
        const formData = new FormData();
        formData.append('imagefront', imagesFront);
        image.forEach((img, index) => {
            formData.append(`images`, img);
        });
        let objectNames = [];
        axios.post(`${Env.server}/api/upload/multiple`, formData)
            .then((res) => {
                let resp = res.data.file;
                for (let i = 0; i < resp.length; i++) {
                    objectNames.push("/images/" + resp[i].filename);
                }
                setResponseImages(objectNames);
                if (res.data.message === "imagesSaved") {
                    PublishImage(objectNames);
                } else {
                    alert("error not in catch")
                }
            })
            .catch((err) => {
                console.log("err------ooo", err)
                alert("catch error");
            })
    }
    const PublishImage = (img) => {
        axios.post(`${Env.server}/api/header/headerImgPost`, img)
            .then((res) => {
                if (res.data.message === "successSave") {
                    setBlogModalOpen(false);
                }
            })
            .catch((err) => {
                console.log("abc----", err);
            })
    }

    const GetAllImgHeader = (img) => {
        axios.get(`${Env.server}/api/header/headerImgGet`)
            .then((res) => {
                setAllGetHeaderImg(res.data.header.img);
            })
            .catch((err) => {
                console.log("abc----", err);
            })
    }
    const updateData = (img) => {
        let data = {
            orderHead: orderHead,
            IndusHead: IndusHead,
            quoteOption: quoteOption,
            howToOrder: howToOrder,
            imageHowToOrder: img,
            lastSection: lastSection,
            lastSectionDetail: lastSectionDetail,
            lastSectionDetailleft: lastSectionDetailleft,
            id: getAllContentHome._id
        }
        axios.patch(`${Env.server}/api/homepage/updateData`, data)
            .then((res) => {
                console.log(" ");
            })
            .catch((err) => {
                console.log("err----", err);
            })
    }

    const getAllContentData = () => {
        axios.get(`${Env.server}/api/homepage/getAll`)
            .then((res) => {

                let da = res.data.hoempage;
                setHowToOrder(da.howToOrder);
                setQuoteOption(da.quoteOption);
                setIndusHead(da.IndusHead);
                setorderHead(da.orderHead);
                setgetAllContentHome(res.data.hoempage);
                setlastSection(da.lastSection)
                setlastSectionDetail(da.lastSectionDetail);
                setlastSectionDetailleft(da.lastSectionDetailleft);
            })
            .catch((err) => {
                console.log("err----", err);
            })
    }


    const handleDeleteBlog = (productId) => {
        setDeleteBlogId(productId);
        setDeleteModalOpen(true);
    };

    return (
        <>
            <div className="bg-white" >
                <div style={{ fontFamily: "'Poppins', sans-serif" }} >
                    <Navbar />
                </div>
                <div style={{ marginTop: "100px" }} >
                    {/*                  Button                */}
                    <div className="d-flex justify-content-center mt-3 me-3">
                        {/* <button className="ButtonDesgin ms-5" style={{ backgroundColor: "#209abc", color: "white" }}>Section One</button>
                        <button className="ButtonDesgin ms-5" style={{ backgroundColor: "#209abc", color: "white" }}>Section Two</button>
                        <button className="ButtonDesgin ms-5" style={{ backgroundColor: "#209abc", color: "white" }}>Section Three</button>
                        <button className="ButtonDesgin ms-5" style={{ backgroundColor: "#209abc", color: "white" }}>Section Four</button> */}
                    </div>
                    <div className="container m-4 d-felx  justify-content-center">
                        <div className="d-felx">
                            <h1 className="mb-4" style={{ marginTop: "50px" }}>Header Images:-</h1>
                            <button className="ButtonDesgin ms-5" onClick={() => setBlogModalOpen(true)} style={{ backgroundColor: "#209abc", color: "white" }}>Header Images</button>
                        </div>
                        <Grid container  >
                            {allGetHeaderImg.map((img) => (
                                <Grid item key={img._id} xs={12} sm={6} md={4} lg={3}>
                                    <Card rd className='cartBox m-5 ' >
                                        <CardMedia
                                            component="img"
                                            alt={img.name}
                                            className='imageCartItem'
                                            image={getAsset(img)}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>




                        <div className="d-flex">
                            <h2 className="mb-4" style={{ marginTop: "50px", fontWeight: "bold" }}>Section One:-</h2>
                        </div>
                        <div >
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Industries Heading</label>
                                <input type="text" class="form-control" value={IndusHead} id="exampleFormControlInput1" onChange={(e) => setIndusHead(e.target.value)} style={{ borderRadius: "7px" }} placeholder="Enter something..." />
                            </div>

                            <div className="d-flex">
                                <h2 className="mb-4" style={{ marginTop: "50px", fontWeight: "bold" }}>Section Two:-</h2>
                                <h4 className="mb-4 ms-3" style={{ marginTop: "50px" }}>(How to Order)</h4>
                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlInput1">How to order Heading</label>
                                <input type="text" class="form-control" value={orderHead} id="exampleFormControlInput1" onChange={(e) => setorderHead(e.target.value)} style={{ borderRadius: "7px" }} placeholder="Enter something..." />
                            </div>
                            <br />
                            <JoditEditor
                                ref={editor}
                                value={howToOrder}
                                // config={config}
                                onChange={newContent => setHowToOrder(newContent)}
                            />
                            <div className="d-flex">
                                <h2 className="mb-4" style={{ marginTop: "50px", fontWeight: "bold" }}>Section Three:-</h2>
                                <h4 className="mb-4 ms-3" style={{ marginTop: "50px" }}>(Quote Option)</h4>
                            </div>
                            <br />
                            <JoditEditor
                                ref={editor}
                                value={quoteOption}
                                // config={config}
                                onChange={newContent => setQuoteOption(newContent)}
                            />
                        </div>
                        <br />
                        <div className="d-flex">
                            <h2 className="mb-4" style={{ marginTop: "50px", fontWeight: "bold" }}>Section Four:-</h2>
                        </div>


                        <div class="form-group">
                            <label for="exampleFormControlInput1">Heading</label>
                            <input type="text" value={lastSection} class="form-control" id="exampleFormControlInput1" onChange={(e) => setlastSection(e.target.value)}  style={{ borderRadius: "7px" }}  placeholder="Enter something..." />
                        </div>
                        <br />
                        <label for="exampleFormControlInput1">Right Side:</label>

                        <JoditEditor
                            ref={editor}
                            value={lastSectionDetail}
                            // config={config}
                            onChange={newContent => setlastSectionDetail(newContent)}
                        />
                        <br/>
                        <label for="exampleFormControlInput1">Left Side:</label>

                        <JoditEditor
                            ref={editor}
                            value={lastSectionDetailleft}
                            // config={config}
                            onChange={newContent => setlastSectionDetailleft(newContent)}
                        />

<br/>

                        <div className="d-flex">
                            <h3 className="mb-4" style={{ marginTop: "50px", fontWeight: "bold" }}><b>Upload All Images:-</b></h3>
                        </div>
 
                        <div
                            onClick={handleInsideClick}
                            style={{
                                marginTop: "0px",
                                marginBottom: "10px",
                                width: '200px',
                                height: '200px',
                                border: '1px dashed #aaa',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundColor: "black"
                            }}
                        >
                            <Grid container spacing={1}>
                                {imagesFront.map((file, index) => (
                                    <Grid item key={file.name}>
                                        <div>
                                            <img src={file.preview} alt={file.name} width="200" />
                                            <IconButton onClick={() => removeImage(index)} size="small">
                                                <ClearIcon />
                                            </IconButton>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                            {/* <img src={dragAndDropImage} alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                            <h3 style={{ color: "white", marginTop: "85px" }}>&nbsp;&nbsp;Choose Image</h3>
                            <input
                                {...getInputProps()}
                                id="fileInput" // Ensure this ID is present
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            />
                        </div>

                        <Grid container spacing={1}>
                            {imagesFront.map((file, index) => (
                                <Grid item key={file.name}>
                                    <div>
                                        <img src={file.preview} alt={file.name} style={{ height: "100px", width: "100px" }} />
                                        <IconButton onClick={() => removeImage(index)} size="small">
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                        <br/>

                        <center><button style={{ borderRadius: "10px", backgroundColor: "#11a5fa", color: "white", fontWeight: "bolder" }} onClick={publishImage1}>Update Content</button></center>
                    </div>

                    <div className="container m-4  justify-content-center">
                        {/* <h1 className="mb-4" style={{ marginTop: "50px" }}>Section One:-</h1> */}
                        <Grid container >

                        </Grid> 
                    </div>
                </div>
            </div>









            <div>


                <Modal
                    open={blogModalOpen}
                    onClose={!blogModalOpen}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            border: '2px solid transparent',
                            borderRadius: "10px",
                            maxHeight: '90vh', // Limiting maximum height for scroll
                            overflowY: 'auto', // Enable vertical scroll when content exceeds maxHeight
                            width: 1000,
                            p: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton className="closeModalIcon" onClick={closeAddProductModal}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <center>

                            <Typography id="modal-title" variant="h4" component="h2">
                                <b>Header Photos</b>
                            </Typography>
                            <Container>
                                <div
                                    onClick={handleInsideClick}
                                    style={{
                                        marginTop: "60px",
                                        marginBottom: "0px",
                                        width: '200px',
                                        height: '200px',
                                        border: '1px dashed #aaa',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        backgroundColor: "black"
                                    }}
                                >
                                    {/* <img src={dragAndDropImage} alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                                    <h3 style={{ color: "white", marginTop: "80px" }}>Choose Image</h3>
                                    <input
                                        {...getInputProps()}
                                        id="fileInput" // Ensure this ID is present
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                    />

                                </div>
                                <Grid container spacing={1}>
                                    {imagesFront.map((file, index) => (
                                        <Grid item key={file.name}>
                                            <div>
                                                <img src={file.preview} alt={file.name} width="200" />
                                                <IconButton onClick={() => removeImage(index)} size="small">
                                                    <ClearIcon />
                                                </IconButton>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>


                                <Button variant="contained" style={{ marginTop: "50px" }} color="primary" onClick={publishImage}>
                                    Publish Images
                                </Button>
                            </Container>

                        </center>
                        {/* <Button onClick={closeAddProductModal}>Close Modal</Button> */}
                    </Box>
                </Modal>
            </div >

        </>
    );
}
export default HomePage;