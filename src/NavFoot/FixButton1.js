import React, { useState } from 'react';

const styles = {
    button: {
        position: 'fixed',
        bottom: '23px',
        right: '30px',
        borderRadius: '10%',
        backgroundColor: '#1ea9d3', // Change the color as needed
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        zIndex: 999,
        transition: 'transform 0.5s', // Apply a transition for smooth rotation
    },
};
const styles1 = {
    button: {
        position: 'fixed',
        bottom: '17px',
        right: '100px',
        borderRadius: '50%',
        backgroundColor: '#1ea9d3', // Change the color as needed
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        zIndex: 999,
        transition: 'transform 0.5s', // Apply a transition for smooth rotation
    },
};

const FixButton1 = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className='-d-flex'>
            {/* <button
                style={{
                    ...styles1.button,
                    transform: isHovered ? 'rotate(360deg)' : 'rotate(0deg)',
                    fontSize: "30px", height: "50px"
                }}
                className="support-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                &nbsp;?&nbsp;
            </button> */}
            {/* <button
                style={{
                    ...styles.button,
                    transform: isHovered ? 'rotate(360deg)' : 'rotate(0deg)',
                }}
                className="support-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Support
            </button> */}
        </div>
    );
};

export default FixButton1;
