import React from 'react';
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router-dom";
import {PROGRAM_ROUTE} from "../utils/consts";
import {Col} from "react-bootstrap";

const ProgramCard = observer( (props)  => {
    const navigate = useNavigate();
    return (
        <Col className="col-12 col-md-6 col-lg-4" onClick={() => navigate(`/program/${props.app.id}`)} style={{cursor:"pointer"}}>
            <div className="card mb-3 border-0">
                <div className="row g-0">
                    <div className="col-md-4 col-3">
                        <img src={props.app.logoPath} className="img-fluid rounded-start mt-3" style={{width:120, height:90}}/>
                    </div>
                    <div className="col-md-8 col-9">
                        <div className="card-body">
                            <h5 className="card-title"><NavLink to={PROGRAM_ROUTE} id={props.app.name}>{props.app.name}</NavLink></h5>
                            <p className="card-text">{props.app.user.fullName}</p>
                            <p className="card-text"><small className="text-muted">{props.app.shortDescription}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
});

export default ProgramCard;