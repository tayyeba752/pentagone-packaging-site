import React from "react";
import "./AddNavBar.css";
import Navbar from "../../DDNav/NavBar/DDNavbar";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import Other from "./Other";

const AddNavBars = () => {
    return (
        <div className="bg-white" style={{backgroundColor:"white"}} >
            <div style={{ fontFamily: "'Poppins', sans-serif" , backgroundColor:"white" }} >
                <Navbar />
            </div>
            {/* indusries */}
            <Other/>
            <One />
            <br />
            <br />
            <br />

            {/* catagories */}
            <Two />
            <br />
            <br />
            <br />
            {/* shaps */}
            <Three />
            <br />
            <br />
            <br />
            {/* material */}
            <Four />

        </div>
    );
}
export default AddNavBars;