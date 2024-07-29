import React, { useState } from "react";
import "./Detail1.css";
import img1 from "../../../Assete/images/Home/New folder/satisfaction.png";
import img2 from "../../../Assete/images/Home/New folder/budgeting.png";
import img3 from "../../../Assete/images/Home/New folder/efficiency.png";
import img4 from "../../../Assete/images/Home/New folder/delivery-man.png";
import img5 from "../../../Assete/images/Home/New folder/premium.png";
import img6 from "../../../Assete/images/Home/New folder/achievement.png";
const Detail1 = () => {
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);


  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - startX;
    setPosition(position + deltaX);
    setStartX(e.touches[0].clientX);
  };

  const handleMove = (direction) => {
    const step = 100; // Adjust the step size for smoother scrolling

    if (direction === "left") {
      setPosition(position - step);
    } else if (direction === "right") {
      setPosition(position + step);
    }
  };

  return (
    <>
    <br/>
      <h1 className="text-center" style={{ color: "#1b80ad" }}>Our Service Type</h1>
      <div className="container mb-2 mt-2 d-flex justify-content-center"> 
          <span className="boxes">
            <img src={img1} className="ms-5 me-5 " style={{ height: "110px", width: "110px" }} />
            <center><b>Best Quality</b></center>
          </span>
          <span className="boxes">
            <img src={img2} className="ms-5 me-5 " style={{ height: "110px", width: "110px" }} />
            <center><b>Budget Friendly</b></center>
          </span>
          <span className="boxes">
            <img src={img3} className="ms-5 me-5 " style={{ height: "110px", width: "110px" }} />
            <center><b>Effecient</b></center>
          </span>
          <span className="boxes">
            <img src={img4} className="ms-5 me-5 " style={{ height: "110px", width: "110px" }} />
            <center><b>Delievery</b></center>
          </span>
          <span className="boxes">
            <img src={img5} className="ms-5 me-5 " style={{ height: "110px", width: "110px" }} />
            <center><b>Premium packaging</b></center>
          </span>
          <span className="boxes">
            <img src={img6} className="ms-5 me-5 " style={{ height: "110px", width: "110px" }} />
            <center><b>Safe </b></center>
          </span> 


      </div>
    </>
  );
};

export default Detail1;
