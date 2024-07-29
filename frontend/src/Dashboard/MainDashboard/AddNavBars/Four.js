import React, { useState, useEffect, useRef, useMemo } from "react";
import "./AddNavBar.css";
import { Link } from "react-router-dom";
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
import img from "../../../Assete/images/Logo/PentagonePng.png"
import { FaEdit } from "react-icons/fa";

const Four = () => {
    const editor = useRef(null)
    const [industriesModalOpen, setIndustriesModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [image, setImages] = useState("");
    const [imagesFront, setImagesFront] = useState([]);
    const [responseImages, setResponseImages] = useState([]);
    const [currentFocuskeyword, setCurrentFocuskeyword] = useState('');
    const [currentTag, setCurrentTag] = useState('');


    const [material, setMaterial] = useState('');
    const [clickEditModal, setClickEditModal] = useState(false);



    const [tags, setTags] = useState([]);
    const [focuskeyword, setFocuskeyword] = useState([]);
    const [metaTitle, setMetaTitle] = useState("");
    const [productCatagory, setProductCatagory] = useState('');
    const [metaDescription, setMetaDescription] = useState('');

    const [getRespMate, setGetRespMate] = useState([]);
    const [useEffectResp, setUseEffectResp] = useState(true);


    const [deleteBlogId, setDeleteBlogId] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [editBlogId, seteditBlogId] = useState("");
    const [editModalOpen, seteditModalOpen] = useState(false);



    useEffect(() => {
        getBlogsMaterial();
    }, [responseImages])
    useEffect(() => {
        getBlogsMaterial();
    }, []);
    useEffect(() => {
        getBlogsMaterial();
    }, [useEffectResp]);


    // const addBlogModal = () => {
    //     setIndustriesModalOpen(true);
    // }
    const getBlogsMaterial = () => {
        axios.get(`${Env.server}/api/material/getAll`)
            .then((resp) => {
                let res = resp.data.material;
                setGetRespMate(res);
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }
    const publishBlogNow = (imgFileName) => {
        let data = {
            title: title,
            description: description,
            material: material,
            image: imgFileName,
            mataTags: tags,
            mataDescription: metaDescription,
            mataTitle: metaTitle,
            FocusKeyWords: focuskeyword,
            productCatagory: productCatagory
        }
        if (!data) {
            alert("fill all fields");
        }
        axios.post(`${Env.server}/api/material/AddNew`, data)
            .then((res) => {
                let resp = res.data.message;
                if (resp === "successSave") {
                    setUseEffectResp(!useEffectResp);
                    closeAddProductModal();
                } else {
                    alert("error not in catch");
                }
            })
            .catch((err) => {
                console.log("Catch Error", err);
                alert("only jpg, png, jpeg, gif or webp images are allowed");
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
                    publishBlogNow(objectNames);
                } else {
                    alert("error not in catch")
                }
            })
            .catch((err) => {
                console.log("Catch Error", err)
                alert("Only jpg, png, jpeg, gif or webp images are allowed");
            })
    }
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
                    updateAllData(objectNames);
                } else {
                    alert("error not in catch")
                }
            })
            .catch((err) => {
                console.log("Catch Error", err)
                alert("Only jpg, png, jpeg, gif or webp images are allowed");
            })
    }

    const updateAllData = (imgFileName) => {
        let data = {
            title: title,
            description: description,
            material: material,
            image: imgFileName,
            mataTags: tags,
            mataDescription: metaDescription,
            mataTitle: metaTitle,
            FocusKeyWords: focuskeyword,
            productCatagory: productCatagory
        }
        axios.patch(`${Env.server}/api/material/updateData`, data)
            .then((resp) => {
                let res = resp.data.materials;
                window.location.reload();
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }

    const handleInsideClick = (e) => {
        e.stopPropagation();
        const isClickable = e.target.tagName === 'DIV' || e.target.tagName === 'INPUT'; // Check if the clicked element is the drop zone or input
        if (isClickable) {
            if (e.target.tagName === 'DIV') {
                document.getElementById('fileInput').click(); // Trigger the file input click event
            }
        }
    };
    const closeAddProductModal = () => {
        setClickEditModal(false);
        setIndustriesModalOpen(false);
        window.location.reload();
    }

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


    const handleMaterialChange = (event) => {
        setMaterial(event.target.value);
    };

    const getAllDataForUpdate = (catagory) => {
        axios.get(`${Env.server}/api/material/getOne/${catagory}`)
            .then((resp) => {
                let res = resp.data.material[0];
                setTitle(res.title);
                setMaterial(res.material);
                setDescription(res.description);
                setMetaTitle(res.mataTitle);
                setTags(res.mataTags)
                setFocuskeyword(res.FocusKeyWords);
                setMetaDescription(res.mataDescription);
                setProductCatagory(res.productCatagory);
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }




    // Meta Tag   
    const handleTagChange = (event) => {
        setCurrentTag(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && currentTag.trim() !== '') {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag('');
        }
    };
    const handleDelete = (tagToDelete) => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
    };
    // Focus keywords
    const handleChangeFocusKeyword = (event) => {
        setCurrentFocuskeyword(event.target.value);
    };
    const handleKeyDownFocusKeyword = (event) => {
        if (event.key === 'Enter' && currentFocuskeyword.trim() !== '') {
            setFocuskeyword([...focuskeyword, currentFocuskeyword.trim()]);
            setCurrentFocuskeyword('');
        }
    };
    const handleDeleteFocusKeyword = (focuskeyToDelete) => {
        setFocuskeyword((prevFocuskey) => prevFocuskey.filter((focuskey) => focuskey !== focuskeyToDelete));
    };
    const handleDeleteBlog = (productId) => {
        setDeleteBlogId(productId);
        setDeleteModalOpen(true);
    };
    const handleDeleteModalClose = () => {
        setUseEffectResp(!useEffectResp);
        setDeleteModalOpen(false);
    }

    const ConfirmedDeleteBlog = () => {
        axios.delete(`${Env.server}/api/material/deleteOne/${deleteBlogId}`)
            .then((res) => {
                if (res.data.message === "SuccessDelete") {
                    setUseEffectResp(!useEffectResp);
                    handleDeleteModalClose();
                }
            })
            .catch((err) => {
                console.log("Catch Error", err);
            })
    }

    return (
        <div className="bg-white body" style={{ backgroundColor: "white" }}>

            <div className=" d-flex"  >
                {/*                  Button                */}
                <div className="container d-flex justify-content-start mt-3">
                    <button className="ButtonDesgin" onClick={() => setIndustriesModalOpen(true)} style={{ backgroundColor: "#209abc", color: "white" }}>Material</button>
                </div>
                <div className="container d-flex justify-content-end mt-3">
                    <button className="ButtonDesgin" onClick={() => setIndustriesModalOpen(true)} style={{ backgroundColor: "#209abc", color: "white" }}>Add Material Data</button>
                </div>
            </div>


            <div className="">
                <div className="row">
                    {getRespMate?.map((data, index) => (
                        <>
                            <div key={index} className="col-lg-3 my-2">
                                <div class="card">
                                    <div class="row g-0" style={{ height: "80px" }}>
                                        <div class="col-md-4" >
                                            <img src={getAsset(data?.image[0])} style={{ height: "70px", width: "70px" }} class="img-fluid m-2" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex">
                                            <h5 class="card-title">{data.title}</h5>
                                            <i className="fa fa-trash mt-2" style={{ fontSize: "23px", cursor: "pointer", color: "red", marginLeft: "4  0px" }} onClick={() => handleDeleteBlog(data._id)}></i>
                                            &nbsp; &nbsp; <div onClick={() => {
                                                setIndustriesModalOpen(true);
                                                setClickEditModal(true);
                                                getAllDataForUpdate(data.material);
                                            }} style={{ fontSize: "23px", cursor: "pointer", color: "#11a5fa", marginLeft: "3  0px" }} >
                                                <FaEdit />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>


            {/*                 MODAL            */}
            <div>

                <Modal
                    open={industriesModalOpen}
                    onClose={!industriesModalOpen}
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
                                <b>Add new Material Data</b>
                            </Typography>
                            <Container>

                                <TextField
                                    label="Product Name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />




                                <FormControl style={{ minWidth: '100%', marginTop: "10px" }}>
                                    <InputLabel id="category-label">Material</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        margin="normal"
                                        id="material"
                                        value={material}
                                        onChange={handleMaterialChange}
                                    >
                                        <MenuItem value="01">Corrugated</MenuItem>
                                        <MenuItem value="02">Cardboard</MenuItem>
                                        <MenuItem value="03">Kraft</MenuItem>
                                        <MenuItem value="04">Paper</MenuItem>
                                        <MenuItem value="05">Rigid</MenuItem>
                                    </Select>
                                </FormControl>

                                <br />
                                <br />
                                <h4>Description:</h4>

                                <JoditEditor
                                    ref={editor}
                                    value={description}
                                    // config={config}
                                    onChange={newContent => setDescription(newContent)}
                                />
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
                                <div className="line"></div>
                                <br />
                                <Typography id="modal-title" variant="h5" component="h2">
                                    <b>SEO Information</b>
                                </Typography>
                                <br />

                                <Grid container spacing={2}>
                                    {/* First Row */}
                                    <Grid item xs={6}>
                                        <TextField label="Mata Title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Meta Tags"
                                            fullWidth
                                            value={currentTag}
                                            onChange={handleTagChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </Grid>

                                    {/* Display Tags */}
                                    <Grid item xs={12}>
                                        {tags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                onDelete={() => handleDelete(tag)}
                                                style={{ margin: 4, backgroundColor: '#e0e0e0' }}
                                            />
                                        ))}
                                    </Grid>

                                    {/* Second Row */}
                                    <Grid item xs={6}>
                                        <TextField label="Catagory" value={productCatagory} onChange={(e) => setProductCatagory(e.target.value)} fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Focus Keyword"
                                            fullWidth
                                            value={currentFocuskeyword}
                                            onChange={handleChangeFocusKeyword}
                                            onKeyDown={handleKeyDownFocusKeyword}
                                        />
                                    </Grid>

                                    {/* Display Tags */}
                                    <Grid item xs={12}>
                                        {focuskeyword.map((fkeyword, index) => (
                                            <Chip
                                                key={index}
                                                label={fkeyword}
                                                onDelete={() => handleDeleteFocusKeyword(fkeyword)}
                                                style={{ margin: 4, backgroundColor: '#e0e0e0' }}
                                            />
                                        ))}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            rowsMin={3}
                                            value={metaDescription}
                                            placeholder="Description"
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                            style={{ width: '100%', marginTop: 10, height: "200px" }}
                                        />
                                    </Grid>
                                </Grid>

                                {clickEditModal ? (
                                    <>
                                        <Button onClick={publishImage1} variant="contained" style={{ marginTop: "50px" }} color="primary">
                                            Update
                                        </Button>
                                    </>
                                ) : (

                                    <>
                                        <Button onClick={publishImage} variant="contained" style={{ marginTop: "50px" }} color="primary">
                                            Publish
                                        </Button>
                                    </>
                                )}
                            </Container>

                        </center>
                        {/* <Button onClick={closeAddProductModal}>Close Modal</Button> */}
                    </Box>
                </Modal>
            </div>

            <div>
                <Dialog open={deleteModalOpen} onClose={handleDeleteModalClose} >
                    <DialogTitle><span style={{ fontWeight: "bolder", color: "#37b2fa", fontSize: "25px" }}><center>Confirm Delete</center></span></DialogTitle>
                    <DialogContent>
                        <Typography><h4>Are you sure you want to delete this item?</h4></Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteModalClose} color="primary">
                            <b>Cancel</b>
                        </Button>
                        <Button onClick={() => ConfirmedDeleteBlog()} color="error">
                            <b> Delete</b>
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>


        </div>
    );
}
export default Four;