import React, { useEffect, useState } from "react";
import "./Testimonials.css"
import DDNavBar from "../../DashboardNavbar/DDNavBar";
import DDFooter from "../../DDLandingPage/DDFooter";
import { Container, TextField, Button, Select, InputLabel, MenuItem, Modal, Box, Typography, IconButton, Grid, TextareaAutosize, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Env from "../../../Environments/Env";

const Testimonials = () => {
    const [openTestimonialModal, setOpenTestimonialModal] = useState(false);
    const [dataTestimonial, setDataTestimonial] = useState({});
    const [gender, setGender] = useState("");
    const [getTestimonials, setGetTestimonials] = useState([]);
    const [checker, setChecker] = useState(false);
    const [deleteTestiID, setDeleteTestiID] = useState("");


    useEffect(() => {
        getAllTestimonials();
    }, [])
    useEffect(() => {
        getAllTestimonials();
    }, [openTestimonialModal])
    useEffect(() => {
        getAllTestimonials();
    }, [checker])


    const handleModalClose = () => {
        setOpenTestimonialModal(false);
    }
    const onchangeHandler = (e) => {
        let obj = dataTestimonial;
        obj[e.target.name] = e.target.value;
        setDataTestimonial(obj);
    }
    const publishTestimonial = () => {
        axios.post(`${Env.server}/api/testimonial/postNewTestimonial`, dataTestimonial)
            .then((res) => {
                let resp = res.data;
                if (resp.message === "successSave") {
                    handleModalClose();
                }
            })
            .catch((err) => {
                console.log("err====,", err);
            })
    }
    const getAllTestimonials = () => {
        axios.get(`${Env.server}/api/testimonial/getAll`)
            .then((res) => {
                if (res.data.message === "successSave") {
                    setGetTestimonials(res.data.testimonials);
                }
            })
            .catch((err) => {
                console.log("err====>>>>", err);
            })
    }

    const deleteTestimonial = () => {
        axios.delete(`${Env.server}/api/testimonial/deleteOne/${deleteTestiID}`)
            .then((res) => {
                if (res.data.message === 'successDelete') {
                    setChecker(!checker);
                }
            })
            .catch((err) => {
                console.log("err====", err);
            })
    }
    const handleModal = (id) => {
        setDeleteTestiID(id);
        setChecker(true);
    }
    const closeConfirmDeletTstiModal = () => {
        setChecker(false);
    }

    return (
        <>
            <body style={{ fontFamily: "'Poppins', sans-serif", height: "auto", minHeight: "500px" }} class="ori-digital-studio">

                <DDNavBar />
                <section id="ori-breadcrumbs" class="ori-breadcrumbs-section position-relative" data-background="assets/img/bg/bread-bg.png">
                    <div class="container">
                        <div class="ori-breadcrumb-content text-center ul-li">
                            <h1 >Testimonials</h1>
                        </div>
                    </div>
                </section>
                <div>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            onClick={() => setOpenTestimonialModal(true)}
                            variant="contained"
                            color="primary"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                margin: '1rem',
                            }}
                        >
                            <b>Add Testimonial</b>
                        </Button>
                    </Box>

                </div>
                <br />
                <br />
                <div style={{ marginTop: "30px" }}>




                    <div className="container">
                        <div className="row">
                            {getTestimonials.map((testimonial, index) => (
                                <div key={index} className="testimonial-box">
                                    <div className="gender-icon-container">
                                        {testimonial.gender === 'male' ? (
                                            <i className="fas fa-male gender-icon-male"></i>
                                        ) : (
                                            <i className="fas fa-female gender-icon-female"></i>
                                        )}
                                    </div>
                                    <IconButton style={{ marginLeft: "400px", cursor: 'pointer', color: '#dc3545' }}>
                                        <DeleteIcon onClick={() => handleModal(testimonial._id)} />
                                    </IconButton>
                                    <div>
                                        <center><span className="namePerson">{testimonial.clientName}</span></center>
                                        <center><span className="nameField">( {testimonial.fieldName} )</span></center>
                                        <Typography variant="body1" className="testimonial-text">{testimonial.review}</Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>




                </div>
            </body>
            <DDFooter />

            <Dialog open={openTestimonialModal} onClose={handleModalClose} maxWidth="md" fullWidth>
                <center><DialogTitle style={{ fontWeight: "bolder", fontSize: "30px", marginBottom: "-36px" }}>Add Testimonial</DialogTitle></center>
                <DialogContent>
                    {/* Client Name Field */}
                    <TextField
                        label="Client Name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => onchangeHandler(e)}
                        margin="normal"
                        name="clientName"
                    />
                    <InputLabel style={{ color: 'black' }}>Select Gender: </InputLabel>
                    <Select
                        // label="Gender"  
                        value={gender}
                        onChange={(e) => {
                            onchangeHandler(e);
                            setGender(e.target.value);
                        }}
                        variant="outlined"
                        fullWidth
                        name="gender"
                        margin="normal"
                    >

                        <MenuItem value="Select Gender" disabled>
                            {/* Placeholder */}
                            <em>Select Gender</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                    </Select>

                    {/* Field Field */}
                    <TextField
                        label="Field (Web / Graphics)"
                        variant="outlined"
                        onChange={(e) => onchangeHandler(e)}
                        fullWidth
                        name="fieldName"
                        margin="normal"
                    />

                    {/* Platform Field */}
                    <TextField
                        label="Platform (fiverr, freelancer)"
                        variant="outlined"
                        onChange={(e) => onchangeHandler(e)}
                        fullWidth
                        name="plateformName"
                        margin="normal"
                    />

                    {/* Description Box */}
                    <TextField
                        label="Review"
                        variant="outlined"
                        onChange={(e) => onchangeHandler(e)}
                        name="review"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                </DialogContent>
                <center>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleModalClose}
                        style={{ margin: '16px', fontWeight: "bold", width: "170px" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={publishTestimonial}
                        color="primary"
                        style={{ margin: '16px', fontWeight: "bold", width: "170px" }}
                    >
                        Publish
                    </Button>
                </center>
            </Dialog>


            <div>
                <Dialog open={checker} onClose={closeConfirmDeletTstiModal}>
                    <DialogTitle><span style={{ fontWeight: "bolder", color: "#37b2fa", fontSize: "25px" }}><center>Confirm Delete</center></span></DialogTitle>
                    <DialogContent>
                        <Typography><b>Are you sure you want to delete this Testimonial?</b></Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeConfirmDeletTstiModal} color="primary">
                            <b>Cancel</b>
                        </Button>
                        <Button onClick={() => deleteTestimonial()} color="error">
                            <b> Delete</b>
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>

        </>
    );
}
export default Testimonials;