
import axios from 'axios';
import React, { useState } from 'react';
import Env from "../Environments/Env";
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import "./Quote.css";

const Quote = () => {
    const navigate = useNavigate();
    const [selectColor, setSelectColor] = useState('');
    const [selectStock, setSelectStock] = useState('');
    const [image, setImages] = useState([]);
    const [data, setData] = useState({});
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [responseImages, setResponseImages] = useState([]);
    const [imagesFront, setImagesFront] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleSelectStock = (e) => {
        setSelectStock(e.target.value);
    };
    const handleChangeColor = (e) => {
        setSelectColor(e.target.value);
    };
    const handleChangeData = (e) => {
        let obj = data;
        obj[e.target.name] = e.target.value
        setData(obj);
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
    const publishImage = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('imagefront', imagesFront);
        // console.log("muzz1-====", imagesFront)
        // console.log("muzz2-====", image)
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
                    publishRequest(objectNames);
                } else {
                    alert("error not in catch")
                }
            })
            .catch((err) => {
                alert("Please Upload JPG, PNG, JPEG, GIF or WEBP Images. ");
                console.log("Error Uploading Images", err)
            })
    }

    const onDrop = (acceptedFiles) => {
        const fileNames = acceptedFiles.map((file) => file.name);
        setImages(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setImagesFront(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setSelectedFileNames(fileNames);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    const publishRequest = (img) => {
        const combinedData = {
            color: selectColor,
            stock: selectStock,
            images: img,
            depth: data.depth,
            email: data.email,
            length: data.length,
            message: data.message,
            name: data.name,
            phNum: data.phNum,
            productInfo: data.productInfo,
            units: data.units,
            width: data.width
            // Add more properties as needed
        };
        if (combinedData.color === "" || combinedData.color === null || combinedData.color === undefined) {
            setLoading(false);
            alert("Please select color");
        } else if (combinedData.stock === "" || combinedData.stock === null || combinedData.stock === undefined) {
            setLoading(false);
            alert("Please select stock");
        } else if (combinedData.length === "" || combinedData.length === null || combinedData.length === undefined) {
            setLoading(false);
            alert("Please enter Length");
        } else if (combinedData.width === "" || combinedData.width === null || combinedData.width === undefined) {
            setLoading(false);
            alert("Please enter Width");
        } else if (combinedData.depth === "" || combinedData.depth === null || combinedData.depth === undefined) {
            setLoading(false);
            alert("Please enter Depth");
        } else if (combinedData.units === "" || combinedData.units === null || combinedData.units === undefined) {
            setLoading(false);
            alert("Please enter Units");
        } else if (combinedData.message === "" || combinedData.message === null || combinedData.message === undefined) {
            setLoading(false);
            alert("Please enter Message");
        } else if (combinedData.email === "" || combinedData.email === null || combinedData.email === undefined) {
            setLoading(false);
            alert("Please enter Email");
        } else if (combinedData.name === "" || combinedData.name === null || combinedData.name === undefined) {
            setLoading(false);
            alert("Please enter Your Name");
        } else if (combinedData.phNum === "" || combinedData.phNum === null || combinedData.phNum === undefined) {
            setLoading(false);
            alert("Please enter Contact Number");
        } else if (combinedData.productInfo === "" || combinedData.productInfo === null || combinedData.productInfo === undefined) {
            setLoading(false);
            alert("Please enter Product Name");
        } else if (combinedData.images === "" || combinedData.images === null || combinedData.images === undefined) {
            setLoading(false);
            alert("Please enter Image");
        }
        axios.post(`${Env.server}/api/quoteform/PostQuoteInformation`, combinedData)
            .then((res) => {
                if (res.data.message === "successSave") {
                    SendEmail(combinedData);
                }
            })
            .catch((err) => {
                console.log("Server Error", err);
            })
    }

    const emptyFields = () => {
        setData({
            color: "",
            stock: "",
            images: "",
            depth: "",
            email: "",
            length: "",
            message: "",
            name: "",
            phNum: "",
            productInfo: "",
            units: "",
            width: ""
        })
        setImages([]);
    }
    const SendEmail = (combinedData) => {
        emptyFields();
        axios.post(`${Env.server}/api/email/mailsend`, combinedData)
            .then((res) => {
                console.log("abc====", res.data)

                if (res.data === "Email sent successfully!") {
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log("Email not Sent", err)
            })
    }
    return (
        <>
            {loading && (
                <header>
                    <div class="Loader">
                        <div class="text">submitting</div>
                        <div class="dots">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </header>
            )}
            <div
                className="content p-4 "
                style={{
                    border: "1px solid transparent",
                    borderRadius: "10px",
                    backgroundColor: "#70d3ff",
                    // fontFamily: "'Poppins', sans-serif"
                }}
            >
                <h2 className="justify-content-center fw-bold ms-5 mt-4">GET QUOTE</h2>
                <div className=" justify-between text-black">
                    <div class="my-1">
                        <label>PRODUCT INFORMATION</label>
                        <input type="email" class="form-control" value={data.productInfo} style={{ borderRadius: "4px" }} onChange={(e) => handleChangeData(e)} name='productInfo' placeholder="Enter your Product Name" />
                    </div>
                    Upload Just Images:-
                    <div
                        onClick={handleInsideClick}

                        style={{
                            marginBottom: "0px",
                            width: '150px',
                            cursor: "pointer",
                            height: '35px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: "black"
                        }}
                    >
                        {/* <img src={dragAndDropImage} alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                        <p className='ms-3 mt-1' style={{ color: "white" }}>Upload Artwork</p>
                        <input
                            {...getInputProps()}
                            id="fileInput" // Ensure this ID is present
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                        />

                    </div>
                </div>
                {image?.map((data, index) => (
                    <div style={{ color: "black" }}>
                        {data.name}
                    </div>
                ))}
                <div class="my-1">
                    <label>SELECT SIZE</label>
                    <div className="d-flex">
                        <input type="number" class="form-control" onChange={(e) => handleChangeData(e)} style={{ borderRadius: "4px" }} name='length' value={data.length} placeholder="Length" />&nbsp;
                        <input type="number" class="form-control" onChange={(e) => handleChangeData(e)} style={{ borderRadius: "4px" }} name='width' value={data.width} placeholder="Width" />&nbsp;
                        <input type="number" class="form-control" onChange={(e) => handleChangeData(e)} style={{ borderRadius: "4px" }} name='depth' value={data.depth} placeholder="Depth" />&nbsp;
                        {/* <input type="number" class="form-control" onChange={(e) => handleChangeData(e)} style={{ borderRadius: "4px" }} name='units' placeholder="Units" />&nbsp; */}
                        <select
                            className="form-select"
                            onChange={(e) => handleChangeData(e)}
                            style={{ borderRadius: "4px", fontSize: "14px" }}
                            name="units"
                            value={data.units}
                        >
                            <option value="choose one">choose one</option>
                            <option value="cm">cm</option>
                            <option value="inch">inch</option>
                            <option value="mm">mm</option>
                        </select>&nbsp;
                    </div>
                </div>
                <div class="my-1">
                    <label>CHOOSE MATERIALS:</label>
                    <div className="d-flex">
                        <select value={selectStock} onChange={handleSelectStock}>
                            <option value="stock">Select Stock</option>
                            <option value="12pt">12pt</option>
                            <option value="14pt">14pt</option>
                            <option value="16pt">16pt</option>
                            <option value="18pt">18pt</option>
                            <option value="20pt">20pt</option>
                            <option value="22pt">22pt</option>
                            <option value="24pt">24pt</option>
                            <option value="cardboard">cardboard stock</option>
                            <option value="carrugated">corrugated stock</option>
                            <option value="kraft">kraft stock</option>
                            <option value="other">other</option>
                        </select>

                        &nbsp;
                        <select value={selectColor} onChange={handleChangeColor}>
                            <option value="SelctColor">Select Color</option>
                            <option value="1 color">1 color</option>
                            <option value="2 color">2 color</option>
                            <option value="3 color">3 color</option>
                            <option value="4 color">4 color</option>
                            <option value="4/1 color">4/1 color</option>
                            <option value="4/2 color">4/2 color</option>
                            <option value="4/3 color">4/3 color</option>
                            <option value="4/4 color">4/4 color</option>
                        </select>
                        &nbsp;
                        <input type="number" class="form-control" style={{ borderRadius: "4px" }} name='quantity' placeholder="Quantity" />&nbsp;
                    </div>
                </div>
                <div class="my-1">
                    <label>Personal Information</label>
                    <div className="d-flex">
                        <input type="text" onChange={(e) => handleChangeData(e)} value={data.name} class="form-control" style={{ borderRadius: "4px" }} name='name' placeholder="Full Name" />&nbsp;
                        <input type="email" onChange={(e) => handleChangeData(e)} value={data.email} class="form-control" style={{ borderRadius: "4px" }} name='email' placeholder="Email ID" />&nbsp;
                        <input type="tel" onChange={(e) => handleChangeData(e)} value={data.phNum} class="form-control" style={{ borderRadius: "4px" }} name='phNum' placeholder="Contact Number" />&nbsp;
                    </div>
                </div>
                <div class="my-1">
                    <label>Additional Information</label>
                    <div className="d-flex">
                        <textarea className='form-control' value={data.message} onChange={(e) => handleChangeData(e)} id="" cols="30" rows="10" name='message' placeholder='Message...?'></textarea>
                    </div>
                </div>
                <center>
                    <button className='btnSty' onClick={publishImage} style={{ margin: "7px", borderRadius: "5px" }}>Submit</button>
                </center>
            </div>
        </>
    );
}
export default Quote;