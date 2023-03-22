import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, Col, Container, Row} from "react-bootstrap";
import {CATALOG_ROUTE} from "../utils/consts";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import {useParams} from "react-router-dom";
import ProgramCard from "../components/ProgramCard";

const CategoryPage = () => {

    const {id} = useParams();
    const [allCategoryInfo,setAllCategoryInfo] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);
    const [applications,setApplications] = useState([]);
    const [pageNumber,setPageNumber] = useState(0);

    async function fetchCategoryById(){
        try{
            setIsAppLoading(true);
            const response = await axios.get(`http://localhost:8072/store/v1/category/${id}`);
            setAllCategoryInfo(response.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }
    async function fetchAppByCategory(pageNumber){
        try{
            setIsAppLoading(true);
            const response = await axios.get(`http://localhost:8072/store/v1/application/category?page=${pageNumber}&size=5&sort=id,asc&categoryId=${id}`);
            setApplications(response.data);
            console.log(response.data)
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    const showPrevPage = () => {
        if(pageNumber > 0){
            setPageNumber(pageNumber - 1);
            fetchAppByCategory(pageNumber);
        }
    }

    const showNextPage = () => {
        if(applications.length !==0){
            setPageNumber(pageNumber + 1);
            fetchAppByCategory(pageNumber);
        }
    }

    useEffect(() => {
        fetchCategoryById();
        fetchAppByCategory(pageNumber);
    }, [])

    return (
            <Container className="d-flex justify-content-center align-items-center w-75 mt-4 mb-4">
                <Col>
                    {isAppLoading
                        ? <Loader/>
                        :
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Item href={CATALOG_ROUTE}>Категории</Breadcrumb.Item>
                                <Breadcrumb.Item active>{allCategoryInfo.name}</Breadcrumb.Item>
                            </Breadcrumb>
                            <p style={{fontSize:32, fontWeight:"normal"}}>
                                {allCategoryInfo.name}
                            </p>
                            <div className="d-flex w-100 mb-4">
                                <img src={allCategoryInfo.image} className="w-100" style={{maxHeight: 290}}/>
                            </div>
                            <Row className="mt-4 ms-2 me-2">
                                {applications.map((app) =>
                                    <ProgramCard app={app} key={app.id}/>
                                )}
                            </Row>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                                {
                                    pageNumber > 0 && <div className="d-flex align-items-center justify-content-start w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={() => showPrevPage()}><i className="fa fa-chevron-left m-2 ms-0"/>Предыдущая страница</button></div>
                                }
                                {
                                    applications.length !== 0 && <div className="d-flex align-items-center justify-content-end w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={() => showNextPage()}>Следующая страница<i className="fa fa-chevron-right m-2 me-0"/></button></div>
                                }
                            </div>
                        </div>
                    }
                </Col>
            </Container>
    );
};

export default CategoryPage;