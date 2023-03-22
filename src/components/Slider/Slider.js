import React from 'react';
import {Carousel} from "react-bootstrap";
const Slider = (props) => {
    return (
            <Carousel variant="dark" className="w-75 m-auto" indicators={false} interval={null}>
                {props.images?.map((image) =>
                    <Carousel.Item key={image.id} style={{maxHeight:500}}>
                        <img
                            className="d-block w-100"
                            src={image.path}
                            alt="First slide"
                        />
                    </Carousel.Item>
                )}
            </Carousel>
        );
    };

export default Slider;