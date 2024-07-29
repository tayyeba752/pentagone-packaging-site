import React, { useState, useEffect, useRef, useMemo } from "react";
import "./AddProduct.css";
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


const AddProduct = () => {
    const editor = useRef(null)
    const [blogModalOpen, setBlogModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [image, setImages] = useState("");
    const [imagesFront, setImagesFront] = useState([]);
    const [responseImages, setResponseImages] = useState([]);
    const [currentFocuskeyword, setCurrentFocuskeyword] = useState('');
    const [currentTag, setCurrentTag] = useState('');

    const [category, setCategory] = useState('');
    const [industry, setIndustry] = useState('');
    const [shapeStyle, setShapeStyle] = useState('');
    const [material, setMaterial] = useState('');


    const [tags, setTags] = useState([]);
    const [focuskeyword, setFocuskeyword] = useState([]);
    const [metaTitle, setMetaTitle] = useState("");
    const [productCatagory, setProductCatagory] = useState('');
    const [metaDescription, setMetaDescription] = useState('');

    const [getResp, setGetResp] = useState([]);
    const [useEffectResp, setUseEffectResp] = useState(true);


    const [deleteBlogId, setDeleteBlogId] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);


    useEffect(() => {
        getBlogs();
    }, [responseImages])
    useEffect(() => {
        getBlogs();
    }, []);
    useEffect(() => {
        getBlogs();
    }, [useEffectResp]);


    const addBlogModal = () => {
        setBlogModalOpen(true);
    }
    const getBlogs = () => {
        axios.get(`${Env.server}/api/product/getAllProduct`)
            .then((resp) => {
                let res = resp.data.products;
                setGetResp(res);
            })
            .catch((err) => {
                console.log("err", err);
            })
    }
    const publishBlogNow = (imgFileName) => {
        let data = {
            title: title,
            description: description,
            industry: industry,
            shapeStyle: shapeStyle,
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
        axios.post(`${Env.server}/api/product/postNew`, data)
            .then((res) => {
                let resp = res.data.message;
                if (resp === "successSave") {
                    closeAddProductModal();
                } else {
                    alert("error not in catch");
                }
            })
            .catch((err) => {
                console.log("err------ooo", err);
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
                    publishBlogNow(objectNames);
                } else {
                    alert("error not in catch")
                }
            })
            .catch((err) => {
                console.log("err------ooo", err)
                alert("catch error");
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
        setBlogModalOpen(false);
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


    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleIndustryChange = (event) => {
        setIndustry(event.target.value);
    };
    const handleShapeStyleChange = (event) => {
        setShapeStyle(event.target.value);
    };
    const handleMaterialChange = (event) => {
        setMaterial(event.target.value);
    };



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
        axios.delete(`${Env.server}/api/product/DeleteSinglProduct/${deleteBlogId}`)
            .then((res) => {
                if (res.data.message === "SuccessDelete") {
                    setUseEffectResp(!useEffectResp);
                    handleDeleteModalClose();
                }
            })
            .catch((err) => {
                console.log("err====>>>", err);
            })
    }

    return (
        <div className="bg-white body" >
            <div style={{ fontFamily: "'Poppins', sans-serif" }} >
                <Navbar />
            </div>
            <div style={{ marginTop: "100px" }} >
                {/*                  Button                */}
                <div className="d-flex justify-content-end mt-3 me-3">
                    <button className="ButtonDesgin" onClick={() => setBlogModalOpen(true)} style={{ backgroundColor: "#209abc", color: "white" }}>Add Product</button>
                </div>
                <div>
                    <br />
                    <Grid container  >
                        {getResp.map((product) => (
                            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <Card className='cartBox m-5 ' >
                                    <IconButton
                                        style={{ position: 'absolute', color: "red", fontSize: '24px' }}
                                        onClick={() => handleDeleteBlog(product._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <CardMedia
                                        component="img"
                                        alt={product.name}
                                        className='imageCartItem'
                                        image={getAsset(product?.image[0])}
                                    />
                                    <CardContent className='contentBar'>
                                        <Typography variant="h6">{product.title}</Typography>
                                        <Typography variant="body2" className='dotstyle'>
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.content) }} />
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                </div>
            </div>


























            {/*                 MODAL            */}
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
                                <b>Add a New Product</b>
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
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        margin="normal"
                                        id="category"
                                        value={category}
                                        onChange={handleCategoryChange}
                                    >
                                        <MenuItem value="Corrugated">Corrugated</MenuItem>
                                        <MenuItem value="Cardboard">Cardboard</MenuItem>
                                        <MenuItem value="Rigid">Rigid</MenuItem>
                                        <MenuItem value="Bakery">Bakery</MenuItem>
                                        <MenuItem value="cosmetic">Cosmetic</MenuItem>
                                        <MenuItem value="shiping">Shipping</MenuItem>
                                        <MenuItem value="mailer">Mailer</MenuItem>
                                        <MenuItem value="retail">Retail</MenuItem>
                                        <MenuItem value="display">Display</MenuItem>
                                        <MenuItem value="small">Small</MenuItem>
                                        <MenuItem value="gable">Gable</MenuItem>
                                        <MenuItem value="pillow">Pillow</MenuItem>
                                        <MenuItem value="cube">Cube</MenuItem>
                                        <MenuItem value="candle">Candle</MenuItem>
                                        <MenuItem value="candy">Candy & Sweet</MenuItem>
                                        <MenuItem value="cofee">Coffee & Tea</MenuItem>
                                        <MenuItem value="electronics">Electronics</MenuItem>
                                        <MenuItem value="folding">Folding</MenuItem>
                                        <MenuItem value="rigid">Rigid</MenuItem>
                                        <MenuItem value="display">Displays</MenuItem>
                                        <MenuItem value="paper">Paper Bags</MenuItem>
                                        <MenuItem value="reuseable">Reusable Bags</MenuItem>
                                        <MenuItem value="mailer">Mailer Bags</MenuItem>
                                        <MenuItem value="pouches">Pouches</MenuItem>
                                        <MenuItem value="stickers">Stickers & Labels</MenuItem>
                                        <MenuItem value="insert">Inserts</MenuItem>
                                        <MenuItem value="tin">Tin</MenuItem>
                                        <MenuItem value="ecofriendly">Eco-Friendly</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl style={{ minWidth: '100%', marginTop: "10px" }}>
                                    <InputLabel id="category-label">Industries</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        margin="normal"
                                        id="industries"
                                        value={industry}
                                        onChange={handleIndustryChange}
                                    >
                                        <MenuItem value="cosmetic">Cosmetic</MenuItem>
                                        <MenuItem value="retail">Retail</MenuItem>
                                        <MenuItem value="shoe">Shoe</MenuItem>
                                        <MenuItem value="food">Food & Beverages</MenuItem>
                                        <MenuItem value="electronics">Electronic</MenuItem>
                                        <MenuItem value="gift">Gift</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl style={{ minWidth: '100%', marginTop: "10px" }}>
                                    <InputLabel id="category-label">Shapes & Style</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        margin="normal"
                                        id="shapesStyle"
                                        value={shapeStyle}
                                        onChange={handleShapeStyleChange}
                                    >
                                        <MenuItem value="sleeve">Sleeve</MenuItem>
                                        <MenuItem value="hangTab">Hang tab</MenuItem>
                                        <MenuItem value="pillow">Pillow</MenuItem>
                                        <MenuItem value="gable">Gable</MenuItem>
                                        <MenuItem value="handle">Handle</MenuItem>
                                        <MenuItem value="display">Display</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl style={{ minWidth: '100%', marginTop: "10px" }}>
                                    <InputLabel id="category-label">Material</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        margin="normal"
                                        id="material"
                                        value={material}
                                        onChange={handleMaterialChange}
                                    >
                                        <MenuItem value="corrugated">Corrugated</MenuItem>
                                        <MenuItem value="cardboard">Cardboard</MenuItem>
                                        <MenuItem value="kraft">Kraft</MenuItem>
                                        <MenuItem value="paper">Paper</MenuItem>
                                        <MenuItem value="rigid">Rigid</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    fullWidth
                                    margin="normal"
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
                                        <TextField label="Mata Title" onChange={(e) => setMetaTitle(e.target.value)} fullWidth />
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
                                        <TextField label="Catagory" onChange={(e) => setProductCatagory(e.target.value)} fullWidth />
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
                                            placeholder="Description"
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                            style={{ width: '100%', marginTop: 10, height: "200px" }}
                                        />
                                    </Grid>
                                </Grid>

                                <Button onClick={publishImage} variant="contained" style={{ marginTop: "50px" }} color="primary">
                                    Publish
                                </Button>
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
                        <Typography><b>Are you sure you want to delete this item?</b></Typography>
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
export default AddProduct;