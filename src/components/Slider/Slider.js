import React from 'react';
import {Carousel} from "react-bootstrap";
const Slider = (props) => {
    return (
            <Carousel variant="dark" className="w-100 m-auto ms-4 me-4" indicators={false} interval={null}>
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