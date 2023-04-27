import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {SEARCH_PAGE_ROUTE} from "../routes/consts";
import data from "bootstrap/js/src/dom/data";

const Search = ({value,placeholder,onChange}) => {
    const navigate = useNavigate();
    const sendData = () => {
        navigate(SEARCH_PAGE_ROUTE)
    }

    return (
        <div className="d-flex w-100">
            <input
                className="form-control rounded-0 ps-2 pe-2 w-100"
                type="text"
                placeholder={placeholder}
                aria-label="Search"
                value={value}
                onChange={onChange}
            />
            <Button className="rounded-0 btn-primary text-nowrap ps-4 pe-4 install ms-2" variant="success" onClick={sendData}>Поиск</Button>
        </div>
    );
};

export default Search;