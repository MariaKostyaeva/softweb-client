import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CategoryBar from "../components/CategoryBar/CategoryBar";
import ProgramCard from "../components/ProgramCard";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import {$host} from "../http";

const Catalog = () => {

    const [categories,setCategory] = useState([]);
    const [applications,setApplications] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);
    let id = 1;

    async function fetchCategory(){
        try{
            setIsAppLoading(true);
            const response = await $host.get('store/v1/category');
            setCategory(response.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    async function fetchAppByCategory(){
        try{
            setIsAppLoading(true);
            const response = await $host.get(`store/v1/application/category?page=0&size=9&sort=id,asc&categoryId=${id}`);
            setApplications(response.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchCategory();
        fetchAppByCategory();
    }, [])
    return (
        <Container className="d-flex justify-content-center align-items-center w-75 mt-4 mb-4">
            <Col>
                {isAppLoading
                    ? <Loader/>
                    : categories.map(category =>
                        <div key={category.id}>
                            <CategoryBar category={category} key={category.id}/>
                            <Row className="mt-4 ms-2 me-2">
                                {applications.map((app) =>
                                    app.category.id === category.id &&
                                    <ProgramCard app={app} key={app.id}/>
                                )}
                            </Row>
                        </div>
                    )
                }
            </Col>
        </Container>
    );
};

export default Catalog;