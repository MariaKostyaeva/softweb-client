import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CATEGORY_ROUTE} from "../../utils/consts";

const CategoryBar = observer((props) => {
    const navigate = useNavigate();
    return (
        <Container>
            <div className="d-flex justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <p key={props.category.id} style={{fontSize:32, fontWeight: "normal"}} className="m-auto">{props.category.name}</p>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <button type="button" className="btn btn-secondary rounded-0" onClick={() => navigate(`/category/${props.category.id}`)}>Показать ещё...</button>
                </div>
            </div>
            <div className="d-flex w-100 mb-4">
                <img src={props.category.image} className="w-100" style={{maxHeight: 290}}/>
            </div>
        </Container>
    );
});

export default CategoryBar;