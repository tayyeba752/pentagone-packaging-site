import React, { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import "./NavBar.css";
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAsset } from "../../utils/helper";
import logo2 from "../../Assete/images/Logo/PentagonePng.png"
import FixButton1 from "../FixButton1";
import Nav2 from "./Nav2";
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import axios from "axios";
import Env from "../../Environments/Env";


const Navbar = () => {
    const navigate = useNavigate();
    const [openSideBar, SetOpenSideBar] = useState(false);
    const [searchData, setSearchData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const data = [
        "Item 1",
        "Item 2",
        "Item 3",
        // Add more items as needed
    ];


    const phoneNumber = '8884046465';

    const handleCallClick = () => {
        window.location.href = `tel:${phoneNumber}`;
    };


    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Filter data based on the search term
        const results = data.filter(item => item.toLowerCase().includes(term));
        setSearchResults(results);
    };

    const AllGetSearchData = (data) => {
        if (data.trim() === '') {
            setSearchData([]); // Clear search results when the input is empty
            return;
        }
        axios.get(`${Env.server}/api/industry/search/${data}`)
            .then((res) => {
                setSearchData(res.data.data)    
            })
            .catch((err) => {
                console.log("err===>>>", err);
            })
    }
    const singlcomponent = (id, title) => {
        navigate(`/GetaQuote/${id}/${title}`);
    }
    const SideBarHandle = () => {
        SetOpenSideBar(!openSideBar);
    }

    return (
        <>
            <FixButton1 />
            <header class="page-header type16 header-newskin" style={{ backgroundColor: "#b4e7f6d6" }}>
                <div class="header content">
                    <i class="fa fa-bars me-2 iconsidebarnone" onClick={SideBarHandle} style={{ fontSize: "24px" }} aria-hidden="true"></i>
                    <strong class="logo cursorPointer">
                        <Link to="/">
                            <img src={logo2} className="imageSize" alt="Logo" />
                        </Link>
                    </strong>




                    <div class="dropdown miniquote-wrapper mt-5 position-relative">
                        <input
                            class="search-input d-flex bu form-control dropdown-toggle p-2"
                            type="text"
                            id="dropdownMenuButton"
                            onChange={(e) => AllGetSearchData(e.target.value)}
                            data-toggle="dropdown"
                            // aria-haspopup="true"
                            style={{ width: "130px", borderRadius: "5px" }}
                            // aria-expanded="false"
                            placeholder="Search?"
                            name="search"
                        />
                        {searchData.length > 0 && (
                            <span style={{ borderRadius: "10px", position: "absolute", left: 0, zIndex: 2000 , cursor:"pointer" }}>

                                {searchData.map((product, index) => (
                                    <span onClick={() => singlcomponent(product._id, product.title)} style={{ borderRadius: "10px" }} key={index}>
                                        <a class="dropdown-item" style={{ color: "black", backgroundColor: "white", height: "auto", width: "130px" }}>
                                            <img src={getAsset(product.image[0])} style={{ height: "30px", width: "30px" }} class="mr-2" />
                                            <span style={{ fontSize: "13px" }}>{product.title}</span>
                                        </a>
                                    </span>
                                ))}
                            </span>
                        )}
                    </div>



                    {/* hjhjhjh
                        <div class="dropdown-menu bu ml-3" aria-labelledby="dropdownMenuButton">
                            {searchData.length > -1 ? (
                                searchData.map((product, index) => (
                                    <a class="dropdown-item" key={index} href="#" style={{ color: "black", backgroundColor: "white", height: "200p" }}>
                                        <img src={getAsset(product.image[0])} alt="Product" style={{ height: "30px" }} class="mr-2" />
                                        {product.item}
                                    </a>
                                ))
                            ) : (
                                <p class="dropdown-item">No matching products found.</p>
                            )}
                        </div> */}
                    {/* <div class="miniquote-wrapper mt-5">
                        <span>
                            <input type="search" style={{ border: "1px solid transparent", borderRadius: "7px", color: "black" }} name="search" onChange={(e) => SearchHandle(e)} placeholder="Search Items" />
                        </span>
                    </div> */} 

                    <div class="miniquote-wrapper marginhandler">
                        <span>
                            <button type="button" className="btn btn-info text-white bg-info fw-bold me-3 buttonDesign">
                                <span onClick={handleCallClick} className="sizeBuPhone">(888) 404-6465</span>
                            </button>
                        </span>
                        <span>
                            <button type="button" className="btn btn-info text-white bg-info fw-bold buttonDesign displayNoneOn">
                                <span className="sizeBuGetQuote" onClick={() => navigate('/GetQuote')}>Get A QUOTE</span>
                            </button>
                        </span>
                    </div>

                    {/* Duplicate search bar */}
                    <div class="miniquote-wrapper mb-2" style={{ marginTop: "-35px" }}>
                        <button type="button" className="btn btn-info text-white bg-info fw-bold buttonDesign hideSearchSecond ">
                            <span className="sizeBuGetQuote mt-3 fontSizeOf" style={{ fontSize: "14px" }} onClick={() => navigate('/GetQuote')}>Get A QUOTE</span>
                        </button>
                    </div>
                </div>
            </header>

            {openSideBar ? (
                <div style={{ backgroundColor: "#44444493", borderRadius: "20px", color: "white" }}>
                    <div >
                        <SidebarMenu >
                            {/* <br /> */}
                            <SidebarMenu.Header id="sidebarMain">
                                <SidebarMenu.Brand style={{ cursor: "pointer" }} onClick={() => SetOpenSideBar(!openSideBar)} >
                                    <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                                </SidebarMenu.Brand>
                            </SidebarMenu.Header>
                            <SidebarMenu.Body>
                                <SidebarMenu.Nav>
                                    <div className="sidebarlinkDopDown">
                                        <React.Fragment>
                                            {/* <div className="borderBottumLine"></div> */}
                                            <SidebarMenu.Nav.Link className="sidebarlink">
                                                <SidebarMenu.Nav.Icon>
                                                    <i className={`fa fa-circle fa-1x`} style={{ color: "white" }}></i>
                                                </SidebarMenu.Nav.Icon>
                                                <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                    <Link to="/" style={{ color: "white", marginLeft: "10px" }} >Home</Link>
                                                </SidebarMenu.Nav.Title>
                                            </SidebarMenu.Nav.Link>
                                            <div className="borderBottumLine"></div>
                                            <SidebarMenu.Nav.Link className="sidebarlink">
                                                <SidebarMenu.Nav.Icon>
                                                    <i style={{ color: "white" }} className={`fa fa-circle fa-1x	`}></i>
                                                </SidebarMenu.Nav.Icon>
                                                <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                    <Link to="/products" style={{ color: "white", marginLeft: "10px" }} >Products</Link>
                                                </SidebarMenu.Nav.Title>
                                            </SidebarMenu.Nav.Link>
                                            <div className="borderBottumLine"></div>

                                            <SidebarMenu.Nav.Link className="sidebarlink">
                                                <SidebarMenu.Nav.Icon>
                                                    <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                </SidebarMenu.Nav.Icon>
                                                <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                    <Link to="/Industries" style={{ color: "white", marginLeft: "10px" }} >Industries</Link>
                                                </SidebarMenu.Nav.Title>
                                            </SidebarMenu.Nav.Link>
                                            <div className="borderBottumLine"></div>
                                            <SidebarMenu.Nav.Link className="sidebarlink">
                                                <SidebarMenu.Nav.Icon>
                                                    <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                </SidebarMenu.Nav.Icon>
                                                <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                    <Link to="/Catagories" style={{ color: "white", marginLeft: "10px" }} >Categories:- </Link>
                                                </SidebarMenu.Nav.Title> 
                                            </SidebarMenu.Nav.Link>
                                            <div className="borderBottumLine"></div>
                                            <SidebarMenu.Nav.Link className="sidebarlink">
                                                <SidebarMenu.Nav.Icon>
                                                    <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                </SidebarMenu.Nav.Icon>
                                                <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                    <Link to="/ShapesAndStyle" style={{ color: "white", marginLeft: "10px" }} >Shapes & Style</Link>
                                                </SidebarMenu.Nav.Title>
                                            </SidebarMenu.Nav.Link>
                                            <div className="borderBottumLine"></div>
                                            <SidebarMenu.Nav.Link className="sidebarlink">
                                                <SidebarMenu.Nav.Icon>
                                                    <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                </SidebarMenu.Nav.Icon>
                                                <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                    <Link to="/Materials" style={{ color: "white", marginLeft: "10px" }} >Material</Link>
                                                </SidebarMenu.Nav.Title>
                                            </SidebarMenu.Nav.Link>
                                            


                                            <div className="borderBottumLine"></div>
                                            <SidebarMenu.Nav.Link className="sidebarlink">
                                                <SidebarMenu.Nav.Icon>
                                                    <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                </SidebarMenu.Nav.Icon>
                                                <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                    <Link to="/contact" style={{ color: "white", marginLeft: "10px" }} >Contact Us</Link>
                                                </SidebarMenu.Nav.Title>
                                            </SidebarMenu.Nav.Link>
                                            <div className="borderBottumLine"></div>




                                            <SidebarMenu.Nav.Link className="sidebarlink">
                                                <SidebarMenu.Nav.Icon>
                                                    <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                </SidebarMenu.Nav.Icon>
                                                <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                    <Link to="/login" style={{ color: "white", marginLeft: "10px" }} >Login</Link>
                                                </SidebarMenu.Nav.Title>
                                            </SidebarMenu.Nav.Link>
                                        </React.Fragment>

                                    </div>

                                    <div className="borderBottumLine"></div>
                                </SidebarMenu.Nav>


                            </SidebarMenu.Body>
                        </SidebarMenu>
                    </div>
                </div>
            ) : (
                <>

                </>
            )
            }

            <Nav2 />



        </>
    );
};

export default Navbar;