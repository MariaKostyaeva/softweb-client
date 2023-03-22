import React from 'react';
import './Loader.style.css';
const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center"
             style={{height: window.innerHeight - 60}}>
            <div className="dots-loader"></div>
        </div>
    );
};

export default Loader;