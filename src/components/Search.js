import React from 'react';
import {Button, Form} from "react-bootstrap";

const Search = ({value, placeholder, onChange, onSubmit}) => {
    return (
        <Form className="d-flex w-100" onSubmit={onSubmit}>
            <input
                className="form-control rounded-0 ps-2 pe-2 w-100"
                type="search"
                placeholder={placeholder}
                aria-label="Search"
                value={value}
                onChange={onChange}
            />
            <Button className="rounded-0 btn-primary text-nowrap ps-4 pe-4 install ms-2" variant="success" type="submit">Поиск</Button>
        </Form>
    );
};

export default Search;