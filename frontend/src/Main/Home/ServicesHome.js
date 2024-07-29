import React, { useState } from "react";
import "./css/ServicesHome.css";

const ServicesHome = () => {
    const [position, setPosition] = useState(0);
    const [startX, setStartX] = useState(0);
    // const data = [
    //     { name: "box", img: require("../../Assete/images/product/174-pizza-box-medium-mockup copy.png") },
    //     { name: "box", img: require("../../Assete/images/product/247-box-mockup copy.jpg") },
    //     { name: "box", img: require("../../Assete/images/product/287-cake-packing-box-mockup copy.jpg") },
    //     { name: "box", img: require("../../Assete/images/product/356-milk-packing-mockup copy.png") },
    //     { name: "box", img: require("../../Assete/images/product/Apparel 2.png") },
    //     { name: "box", img: require("../../Assete/images/product/Bakery and Cakes Bix.jpg") },
    //     { name: "box", img: require("../../Assete/images/product/Bar_of_Chocolate.jpg") },
    //     { name: "box", img: require("../../Assete/images/product/Bar_of_Chocolate_v02.jpg") },
    //     { name: "box", img: require("../../Assete/images/product/Beer Can.jpg") },
    //     { name: "box", img: require("../../Assete/images/product/Beer Package Mockup copy.jpg") },
    //     { name: "box", img: require("../../Assete/images/product/Box Insert.png") },
    //     { name: "box", img: require("../../Assete/images/product/Box Sleeve.png") },
    //     { name: "box", img: require("../../Assete/images/product/Burger box.png") },
    //     { name: "box", img: require("../../Assete/images/product/Burger_Mockup_v01 co.png") },
    //     { name: "box", img: require("../../Assete/images/product/Cake packing box.png") },
    // ]

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
            setPosition(position + step);
        } else if (direction === "right") {
            setPosition(position - step);
        }
    };

    return (
        <div className="servicesHomeBody">
            <center><h1 style={{ color: "#1b80ad" }}>
                Our Service Type
            </h1></center>
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                className="horizontal-scroll-container"
                style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    marginLeft: "60px",
                    marginRight: "60px",
                }}
            >
                <div className="container mb-2 mt-2 d-flex">
                    {/* {data.map((dat, index) => (
                        <div className="me-5" key={index}>
                            <img
                                src={dat.img}
                                className="ms-5 me-5 boxes"
                                style={{ height: "130px", width: "130px" }}
                            />
                            <h4 className="boxes1">{dat.name}</h4>
                        </div>
                    ))} */}
                </div>
            </div>

        </div>
    );
};

export default ServicesHome;

