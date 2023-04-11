import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {SEARCH_PAGE_ROUTE} from "../routes/consts";

const Search = (props) => {
    const navigate = useNavigate();
    const [searchData,setSearchData] = useState();
    return (
        <div className="d-flex w-100">
            <input
                className="form-control rounded-0 ps-2 pe-2 w-100"
                type="text"
                placeholder="Поиск"
                aria-label="Search"
                value={searchData}
                onChange={e => setSearchData(e.target.value)}
            />
            <Button className="rounded-0 btn-primary text-nowrap ps-4 pe-4 install ms-2" variant="success" onClick={() => navigate(SEARCH_PAGE_ROUTE)}>Поиск</Button>
        </div>
    );
};

export default Search;