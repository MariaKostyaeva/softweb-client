import React from 'react';
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router-dom";
import {PROGRAM_ROUTE} from "../routes/consts";
import {Col} from "react-bootstrap";

const ProgramCardMainPage = observer((props) => {
    const navigate = useNavigate();
    return (
        <Col className="col-12 col-lg-12" onClick={() => navigate(`/program/${props.app.id}`)} style={{cursor:"pointer", minWidth:150}}>
            <div className="card mb-3 border-0 rounded-1 m-1" style={{height:150}}>
                <div className="row m-auto d-flex align-items-stretch h-100 w-100">
                    <div className="col-2 col-lg-4 m-auto d-flex justify-content-center">
                        <img src={props.app.logoPath} style={{width:80, height:80, minWidth:40,minHeight:40}}/>
                    </div>
                    <div className="col-lg-8 col-10 m-auto">
                        <div className="m-auto w-100" style={{minWidth:100,width:125}}>
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

export default ProgramCardMainPage;