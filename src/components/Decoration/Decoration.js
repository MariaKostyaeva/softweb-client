import React from 'react';
import background from '../../assets/decoration.svg';
import './Decoration.style.css';
import {Container} from "react-bootstrap";
const Decoration = () => {
    return (
        <div style={{backgroundImage: 'url(${background})'}}>

        </div>
    );
};

export default Decoration;