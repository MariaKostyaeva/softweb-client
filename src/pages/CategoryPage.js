import React, {useEffect, useState} from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {CATALOG_ROUTE} from "../routes/consts";
import Loader from "../components/Loader/Loader";
import {useParams} from "react-router-dom";
import ProgramCard from "../components/ProgramCard";
import {$host} from "../http";
import data from "bootstrap/js/src/dom/data";
import usePagination from "../hooks/usePagination";
import axios from "axios";

const CategoryPage = () => {
    const {id} = useParams();
    const [isAppLoading,setIsAppLoading] = useState(false);
    const [category,setCategory] = useState([]);
    const [applications,setApplications] = useState([]);
    const [total,setTotal] = useState([]);

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        totalPages,
    } = usePagination({contentPerPage: 9, count: total['total'],});

    const fetchCategoryById = async () => {
        try {
            const response = await $host.get(`store/v1/category/${id}`);
            setCategory(response.data);
        } catch (e) {
            console.log(e.toString())
        }
    }

    const fetchTotalInfoQtyApp = async () => {
        await axios.get(`http://localhost:8072/store/v1/application/category/info?size=9&categoryId=${id}`)
            .then((res) => {
                setTotal(res.data)
                fetchAppByCategory(res.data)
            })
            .catch((e) => console.log(e.toString()))
    }

    const fetchAppByCategory = async (total) => {
        try {
            setIsAppLoading(true);
            const response = await $host.get(`store/v1/application/category?size=${total['total']}&sort=id,asc&categoryId=${id}`);
            setApplications(response.data)
            setIsAppLoading(false);
        } catch (e) {
            console.log(e.toString())
        }
    }

    useEffect(() => {
        fetchCategoryById();
        fetchTotalInfoQtyApp();
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
                                <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
                            </Breadcrumb>
                            <p style={{fontSize:32, fontWeight:"normal"}}>
                                {category.name}
                            </p>
                            <div className="d-flex w-100 mb-4">
                                <img src={category.image} className="w-100" style={{maxHeight: 290}} alt={`Изображение категории ${category.name}`} />
                            </div>
                            <Row className="mt-4 ms-2 me-2">
                                {
                                    applications.slice(firstContentIndex,lastContentIndex).map((el:any) => (
                                        <ProgramCard app={el} key={el.id}/>
                                    ))
                                }
                            </Row>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                                {
                                    lastContentIndex !== 9 && <div className="d-flex align-items-center justify-content-start w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={prevPage}><i className="fa fa-chevron-left m-2 ms-0"/>Предыдущая страница</button></div>
                                }
                                {
                                    page !== totalPages && <div className="d-flex align-items-center justify-content-end w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={nextPage}>Следующая страница<i className="fa fa-chevron-right m-2 me-0"/></button></div>
                                }
                            </div>
                        </div>
                    }
                </Col>
            </Container>
    );
};

export default CategoryPage;