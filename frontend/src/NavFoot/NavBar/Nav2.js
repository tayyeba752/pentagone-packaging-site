import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import "./NavBar.css";
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ImLocation } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";

// industries image
import img1 from "../../Assete/images/navbar/pngwing.com.png";
import img2 from "../../Assete/images/navbar/retailBox.png";
import img3 from "../../Assete/images/navbar/shoes.png";
import img33 from "../../Assete/images/Eco-Friendly.jpg";

import img4 from "../../Assete/images/navbar/apparel.png";
import img5 from "../../Assete/images/navbar/food.png";
import img6 from "../../Assete/images/navbar/electric.png";
import img7 from "../../Assete/images/navbar/gift.png";
import logo2 from "../../Assete/images/Logo/PentagonePng.png"

// R1
import one1 from "../../Assete/images/navbar/R1/Corrugated.png"
import two1 from "../../Assete/images/navbar/R1/Cardboard.png"
import three1 from "../../Assete/images/navbar/R1/Kraft.png"
import four1 from "../../Assete/images/navbar/R1/Rigid.png"
import five1 from "../../Assete/images/navbar/R1/Bakery.png"
import six1 from "../../Assete/images/navbar/R1/Cosmetic.png"
import seven1 from "../../Assete/images/navbar/R1/Shipping.png"
import eight1 from "../../Assete/images/CBD.jpeg"
import nine1 from "../../Assete/images/navbar/R1/Retail.png"

import one2 from "../../Assete/images/navbar/R2/Display.png"
import two2 from "../../Assete/images/navbar/R2/small.png"
import three2 from "../../Assete/images/navbar/R2/Gable.png"
import four2 from "../../Assete/images/navbar/R2/Pillow.png"
import five2 from "../../Assete/images/navbar/R2/cube.png"
import six2 from "../../Assete/images/navbar/R2/candle.png"
import seven2 from "../../Assete/images/navbar/R2/sweet.png"
import eight2 from "../../Assete/images/navbar/R2/cofee.png"
import nine2 from "../../Assete/images/navbar/R2/Electronic.png"
import axios from "axios";
import Env from "../../Environments/Env";
import { getAsset } from "../../utils/helper";


const Nav2 = () => {
    const navigate = useNavigate();
    const [showRetailDropdown, setShowRetailDropdown] = useState(false);
    const [showElectronicsDropdown, setShowElectronicsDropdown] = useState(false);
    const [Allothers, setAllother] = useState([]);
    const [Catagories, setCatagories] = useState([]);

    let style1 = {
        fontWeight: "bolder",
        fontSize: "14px",
        color: "white"
    }

    // const industries = [
    //     {
    //         title: "Cosmetic Boxes",
    //         link: "/Industry/01/Cosmetic Box",
    //         img: img1
    //     },
    //     {
    //         title: "Retail Boxes",
    //         link: "/Industry/02/Retail Box",
    //         img: img2
    //     },
    //     {
    //         title: "Shoe Boxes",
    //         link: "/Industry/03/Shoes Box",
    //         img: img3
    //     },
    //     {
    //         title: "Food and Beverage",
    //         link: "/Industry/04/Food and Beverage Box",
    //         img: img5
    //     },
    //     {
    //         title: "Apparel Boxes",
    //         link: "/Industry/05/Apparel Box",
    //         img: img4
    //     },
    //     {
    //         title: "Eco-Friendly Boxes",
    //         link: "/Industry/08/Eco-Friendly Box",
    //         img: img33
    //     },
    //     {
    //         title: "Electronic Boxes",
    //         link: "/Industry/06/Electronics Box",
    //         img: img6
    //     },
    //     {
    //         title: "Gift Boxes",
    //         link: "/Industry/07/Gift Box",
    //         img: img7
    //     },
    //     {
    //         title: "Gift Boxes",
    //         link: "/Industry/07/Gift Box",
    //         img: img7
    //     },
    //     {
    //         title: "Gift Boxes",
    //         link: "/Industry/07/Gift Box",
    //         img: img7
    //     },
    //     {
    //         title: "Gift Boxes",
    //         link: "/Industry/07/Gift Box",
    //         img: img7
    //     },
    //     {
    //         title: "Gift Boxes",
    //         link: "/Industry/07/Gift Box",
    //         img: img7
    //     },
    //     {
    //         title: "Gift Boxes",
    //         link: "/Industry/07/Gift Box",
    //         img: img7
    //     },
    // ];

    useEffect(() => {
        axios.get(` ${Env.server}/api/other/getAll`)
            .then((res) => { setAllother(res.data.industries) })
            .catch((err) => { console.log("err", err) })
    }, [])


    useEffect(() => {
        axios.get(` ${Env.server}/api/catagory/getAll`)
            .then((res) => { setCatagories(res.data.catagory) })
            .catch((err) => { console.log("err", err) })
    }, [])


    const rows = [];
    for (let i = 0; i < Allothers.length; i += 3) {
        rows.push(Allothers.slice(i, i + 3));
    }


    const rowss = [];
    for (let i = 0; i < Catagories.length; i += 5) {
        rowss.push(Catagories.slice(i, i + 5));
    }



    const cosmaticbox = () => {
        navigate = ('/NavBarbox');
    }

    const imggg = img2;

    return (
        <div className="sticky-top navbarSticky" style={{ marginTop: "-20px", backgroundColor: "#25abd0" }}>
            <nav class="navigation sw-megamenu" style={{ marginTop: "-20px", border: "none" }} role="navigation">
                <ul>
                    <li class="ui-menu-item level0 fl-left"><Link to="/" class="level-top cursorPointer"><b style={style1}>Home</b></Link></li>

                    <li class="ui-menu-item level0 fullwidth parent hoverFun">
                        <a class="level-top cursorPointer" title="Industries" ><b style={style1}>Products </b></a>
                        <div class="level0 submenu">
                            <div class="container">
                                <div class="menu-top-block">
                                    <div id="p-menu" class="drop-menu-section drop-menu-section--reset-browser-style drop-menu-section--reset-magento-style">
                                        <div class="drop-menu-section__inner">
                                            <div style={{ cursor: "pointer" }} class="parent-link drop-menu-section-column">
                                                <div class="parent-link drop-menu-section-column__content  p-nav-industries">

                                                    <a class="parent-link" href="/Industries"><h5 >By Industries</h5></a>

                                                    {/* <div class="sub-menu">
                                                        <ul>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory1">SubCategory 1</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li> 
                                                        </ul>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div style={{ cursor: "pointer" }} class="parent-link drop-menu-section-column">
                                                <div class="parent-link drop-menu-section-column__content  p-nav-industries">

                                                    <a class="parent-link" href="/Catagories"><h5 >By Catagories</h5></a>

                                                    {/* <div class="sub-menu">
                                                        <ul>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory1">SussbCategory 1</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li>
                                                            <li><a href="/Industry/02/Retail Box/SubCategory2">SubCategory 2</a></li> 
                                                        </ul>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>


                    {/* <li className="ui-menu-item level0 fullwidth parent hoverFun">
                        <a href="/Industries" className="level-top cursorPointer" title="Industries">
                            <b style={style1}>Industries </b>
                        </a>
                        <div className="level0 submenu">
                            <div className="container">
                                <div className="menu-top-block">
                                    <div id="p-menu" className="drop-menu-section drop-menu-section--reset-browser-style drop-menu-section--reset-magento-style">
                                        <div className="drop-menu-section__inner row">
                                            {rows.map((row, rowIndex) => (
                                                <div key={rowIndex} className="drop-menu-section-column col-md-12">
                                                    {row.map((industry, index) => (
                                                        <div key={index} className="drop-menu-section-column__content p-nav-industries">
                                                            <Link to={`/Industry/${industry._id}/${industry.title}`} className="drop-menu-section-item cursorPointer">
                                                                <div className="drop-menu-section-item__fig-wrap">
                                                                    <img className="porto-lazyload" src={getAsset(industry?.image[0])} style={{ height: "50px", width: "50px" }} alt={industry.title} />
                                                                </div>
                                                                <span>{industry.title}</span>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li> */}
                    {/* 
                    <li className="ui-menu-item level0 fullwidth parent hoverFun">
                        <a href="/Catagories" className="level-top cursorPointer" title="Industries">
                            <b style={style1}>Categories</b>
                        </a>
                        <div className="level0 submenu">
                            <div className="container">
                                <div className="menu-top-block">
                                    <div id="p-menu" className="drop-menu-section drop-menu-section--reset-browser-style drop-menu-section--reset-magento-style">
                                        <div className="drop-menu-section__inner row">
                                            {rowss.map((rows, rowIndex) => (
                                                <div key={rowIndex} className="drop-menu-section-column col-md-3">
                                                    {rows.map((category, index) => (
                                                        <div key={index} className="drop-menu-section-column__content p-nav-industries">
                                                            <Link to={`/Catagory/${category?._id}/${category.title}`} className="drop-menu-section-item cursorPointer">
                                                                <div className="drop-menu-section-item__fig-wrap">
                                                                    <img className="porto-lazyload" src={getAsset(category?.image[0])} style={{ height: "50px", width: "50px" }} alt={category.title} />
                                                                </div>
                                                                <span>{category.title}</span>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li> */}


                    <li class="ui-menu-item level0 fullwidth parent hoverFun"><a class="level-top cursorPointer" title="Industries" ><b style={style1}>Shapes & Styles </b></a>
                        <div class="level0 submenu">
                            <div class="container">
                                <div class="menu-top-block">
                                    <div id="p-menu" class="drop-menu-section drop-menu-section--reset-browser-style drop-menu-section--reset-magento-style">
                                        <div class="drop-menu-section__inner">
                                            <div class="drop-menu-section-column ">
                                                <div class="drop-menu-section-column__content p-nav-industries">
                                                    <ul>
                                                        <li>
                                                            <Link to="/ShapeStyle/01/Sleeve Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Sleeve   Boxes
                                                                </span>
                                                            </Link>
                                                        </li>


                                                        <li>
                                                            <Link to="/ShapeStyle/02/Hang Tab Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Hang tab   Boxes
                                                                </span>
                                                            </Link>
                                                        </li>


                                                        <li>
                                                            <Link to="/ShapeStyle/03/Pillow Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Pillow   Boxes
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="drop-menu-section-column ">

                                                <div class="drop-menu-section-column__content p-nav-industries">
                                                    <ul>
                                                        <li>
                                                            <Link to="/ShapeStyle/04/Gable Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Gable   Boxes
                                                                </span>
                                                            </Link>
                                                        </li>


                                                        <li>
                                                            <Link to="/ShapeStyle/05/Handle Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Handle   Boxes
                                                                </span>
                                                            </Link>
                                                        </li>


                                                        <li>
                                                            <Link to="/ShapeStyle/06/Display Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Display   Boxes
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="menu-bottom-block"><a >Cosmetic  Boxes</a>
                                    <a >Retail Boxes</a>
                                    <a >Food &amp; Beverages</a>
                                    <a >Apparel Boxes</a>
                                    <a >Electronic Boxes</a>
                                    <a >Gift Boxes</a>
                                    <a >Shoe Boxes</a>

                                </div> */}
                            </div>
                        </div>
                    </li>
                    <li class="ui-menu-item level0 fullwidth parent hoverFun"><a class="level-top cursorPointer" title="Industries" ><b style={style1}>Material </b></a>
                        <div class="level0 submenu" >
                            <div class="container">
                                <div class="menu-top-block">
                                    <div id="p-menu" class="drop-menu-section drop-menu-section--reset-browser-style drop-menu-section--reset-magento-style">
                                        <div class="drop-menu-section__inner">
                                            <div class="drop-menu-section-column">
                                                <div class="drop-menu-section-column__content p-nav-industries">
                                                    <ul>
                                                        <li>
                                                            <Link to="/Material/01/Corrugated Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> 	Corrugated Boxes
                                                                </span>
                                                            </Link>
                                                        </li>


                                                        <li>
                                                            <Link to="/Material/02/Cardboard Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Cardboard   Boxes
                                                                </span>
                                                            </Link>
                                                        </li>


                                                        <li>
                                                            <Link to="/Material/03/Kraft Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Kraft Boxes
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/Material/04/Paper Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Paper Boxes
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/Material/05/Rigid Box" class="drop-menu-section-item cursorPointer">
                                                                <span>
                                                                    <i class="fa fa-eercast" aria-hidden="true"></i> Rigid Boxes
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* <div class="menu-bottom-block"><a >Cosmetic  Boxes</a>
                                    <a >Retail Boxes</a>
                                    <a >Food &amp; Beverages</a>
                                    <a >Apparel Boxes</a>
                                    <a >Electronic Boxes</a>
                                    <a >Gift Boxes</a>
                                    <a >Shoe Boxes</a>
                                </div> */}
                            </div>
                        </div>
                    </li>
















                    <li className="ui-menu-item level0 fullwidth parent hoverFun">
                        <a href="/StickerLabel" className="level-top cursorPointer" title="StickerLabel">
                            <b style={style1}>Labels & Stickers </b>
                        </a> 
                    </li>









                    {/* <li class="ui-menu-item level0 fl-right hoverFun" onClick={() => navigate("/login")}><span class="level-top cursorPointer"><b style={style1}>fef</b></span></li> */}
                    <li class="ui-menu-item level0 fl-right hoverFun" onClick={() => navigate("/contact")}><a target="_blank" class="level-top cursorPointer"><b style={style1}>Contact Us </b></a></li>
                    {/* <li class="ui-menu-item level0 fl-right hoverFun" onClick={() => navigate("/products")}><span class="level-top cursorPointer"><b style={style1}>Products</b></span></li> */}
                    {/* <li class="ui-menu-item level0 fl-right hoverFun"><a class="level-top cursorPointer"><b style={style1}>Blog</b></a></li> */}
                </ul>
            </nav>
        </div>
    );
};

export default Nav2;