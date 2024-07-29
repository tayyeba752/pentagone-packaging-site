import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import "./NavBar.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo2 from "../../../Assete/images/Logo/PentagonePng.png";
import SidebarMenu from 'react-bootstrap-sidebar-menu';


const DDNavbar = () => {
    const navigate = useNavigate();
    const [openSideBar, SetOpenSideBar] = useState(false);

    const SideBarHandle = () => {
        SetOpenSideBar(!openSideBar);
    }
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    let UserAvailable = localStorage.getItem("name");
    let UserRole = localStorage.getItem("role");

    useEffect(() => {
        if (!UserAvailable) {
            navigate({
                pathname: "/",
            });
        }
    }, [UserAvailable, navigate]);

    const Logout = () => {
        localStorage.clear();
    };

    let style1 = {
        fontWeight: "bolder",
        fontSize: "14px",
        color: "white"
    };

    return (
        <>

            <div className="sticky-top navbarDesign">
                <nav className="navigation sw-megamenu marginHandle" style={{ border: "none" }} role="navigation">
                    <ul>
                        <li className="ui-menu-item level0 fl-left"><a target="_blank" className="level-top cursorPointer"><b style={style1}><i class="fa fa-bars me-2 iconsidebarnone" onClick={SideBarHandle} style={{ fontSize: "24px", color: "white" }} aria-hidden="true"></i><img src={logo2} onClick={() => navigate("/")} style={{ height: "55px", width: "160px" }} alt="abc" /></b></a></li>
                        <li className="ui-menu-item level0 fullwidth parent hoverFun hideNavBar"><Link to="/Admin/Dashboard" className="level-top cursorPointer" title="Dashboard" ><b style={style1}>Dashboard </b></Link></li>
                        <li className="ui-menu-item level0 fullwidth parent hoverFun hideNavBar"><Link to="/Admin/AddNavBar" className="level-top cursorPointer" title="Add Nav Items Data"><b style={style1}>NavBar</b></Link></li>
                        <li className="ui-menu-item level0 fullwidth parent hoverFun hideNavBar"><Link to="/Admin/HomePage" className="level-top cursorPointer" title="Manage HomePage" ><b style={style1}>HomePage</b></Link></li>
                        <li className="ui-menu-item level0 fullwidth parent hoverFun hideNavBar"><Link to="/Admin/AddProduct" className="level-top cursorPointer" title="Add Product"><b style={style1}>Product</b></Link></li>
                        <li className="ui-menu-item level0 fullwidth parent hoverFun hideNavBar"><Link to="/Admin/GetQuote" className="level-top cursorPointer" title="Total Quotes"><b style={style1}>Quotes</b></Link></li>
                        {/* Move the following line to the end of the list */}
                        <li className="me-4" style={{ float: "right", marginTop: "-60px" }}><span onClick={Logout} className="cursorPointer"><b style={style1}>LogOut</b></span></li>
                    </ul>
                </nav>
            </div >






            {
                openSideBar ? (
                    <div style={{ backgroundColor: "#44444493", borderRadius: "20px", color: "white", marginTop: "90px" }} >
                        <div className={`sidebar ${openSideBar ? 'active' : ''}`} >
                            <SidebarMenu className={`sidebar ${openSideBar ? 'active' : ''}`} >
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
                                                        <Link to="/Admin/Dashboard" style={{ color: "white", marginLeft: "10px" }} >Dashboard</Link>
                                                    </SidebarMenu.Nav.Title>
                                                </SidebarMenu.Nav.Link>
                                                <div className="borderBottumLine"></div>
                                                <SidebarMenu.Nav.Link className="sidebarlink">
                                                    <SidebarMenu.Nav.Icon>
                                                        <i style={{ color: "white" }} className={`fa fa-circle fa-1x	`}></i>
                                                    </SidebarMenu.Nav.Icon>
                                                    <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                        <Link to="/Admin/AddNavBar" style={{ color: "white", marginLeft: "10px" }} >NavBar</Link>
                                                    </SidebarMenu.Nav.Title>
                                                </SidebarMenu.Nav.Link>
                                                <div className="borderBottumLine"></div>

                                                <SidebarMenu.Nav.Link className="sidebarlink">
                                                    <SidebarMenu.Nav.Icon>
                                                        <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                    </SidebarMenu.Nav.Icon>
                                                    <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                        <Link to="/Admin/HomePage" style={{ color: "white", marginLeft: "10px" }} >HomePage   </Link>
                                                    </SidebarMenu.Nav.Title>
                                                </SidebarMenu.Nav.Link>
                                                <div className="borderBottumLine"></div>

                                                <SidebarMenu.Nav.Link className="sidebarlink">
                                                    <SidebarMenu.Nav.Icon>
                                                        <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                    </SidebarMenu.Nav.Icon>
                                                    <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                        <Link to="/Admin/AddProduct" style={{ color: "white", marginLeft: "10px" }} >Product</Link>
                                                    </SidebarMenu.Nav.Title>
                                                </SidebarMenu.Nav.Link>
                                                <div className="borderBottumLine"></div>
                                                <SidebarMenu.Nav.Link className="sidebarlink">
                                                    <SidebarMenu.Nav.Icon>
                                                        <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                    </SidebarMenu.Nav.Icon>
                                                    <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                        <Link to="/Admin/GetQuote" style={{ color: "white", marginLeft: "10px" }} >All Quotes</Link>
                                                    </SidebarMenu.Nav.Title>
                                                </SidebarMenu.Nav.Link>
                                                <div className="borderBottumLine"></div>
                                                <SidebarMenu.Nav.Link className="sidebarlink">
                                                    <SidebarMenu.Nav.Icon>
                                                        <i style={{ color: "white" }} className={`fa fa-circle fa-1x`}></i>
                                                    </SidebarMenu.Nav.Icon>
                                                    <SidebarMenu.Nav.Title className="sidebarTitleNav">
                                                        <Link to="" onClick={Logout} style={{ color: "white", marginLeft: "10px" }} >Logout</Link>
                                                    </SidebarMenu.Nav.Title>
                                                </SidebarMenu.Nav.Link>
                                            </React.Fragment>

                                        </div>

                                        <div className="borderBottumLine"></div>
                                    </SidebarMenu.Nav>


                                </SidebarMenu.Body>
                            </SidebarMenu>
                        </div>
                    </div >
                ) : (
                    <>

                    </>
                )
            }
        </>
    );
};

export default DDNavbar;
