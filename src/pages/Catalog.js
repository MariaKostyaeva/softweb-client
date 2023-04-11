import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CategoryBar from "../components/CategoryBar/CategoryBar";
import ProgramCard from "../components/ProgramCard";
import Loader from "../components/Loader/Loader";
import {$host} from "../http";
import Search from "../components/Search";
import {forEach, map} from "react-bootstrap/ElementChildren";
import axios from "axios";
import app from "../App";

const Catalog = () => {

    const [categories,setCategory] = useState([]);
    const [applications,setApplications] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);

    const fetchCategory = async () => {
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

    const fetchAppByCategory = async () => {
        try{
            setIsAppLoading(true);
            for(let i = 1; i < categories.length + 1; i++){
                const response = await $host.get(`store/v1/application/category?page=0&size=6&sort=id,asc&categoryId=${i}`);
                setApplications([...applications,response.data]);
            }
            setIsAppLoading(false);
        } catch (e) {
            console.log(e.toString())
        }
    }

    useEffect(() => {
        fetchCategory();
        fetchAppByCategory();
    }, [])
    return (
        <div className="w-100">
            <div className="w-100 main-container h-auto">
                <Container className="d-flex justify-content-center align-items-center w-75" style={{height:400}}>
                    <Col className="p-3">
                        <div className="d-flex flex-wrap">
                            <h2 className="text-color" style={{fontWeight:200}}>Найдите тысячи программ, используемых миллионами людей, в мультиплатформенном магазине <i>"SoftWeb"</i></h2>
                        </div>
                        <div className="search-box mb-4">
                            <Search/>
                        </div>
                    </Col>
                </Container>
            </div>
            <Container className="d-flex justify-content-center align-items-center w-75 mt-4 mb-4">
                <Col>
                    {isAppLoading
                        ? <Loader/>
                        : categories.map(category =>
                            <div key={category.id}>
                                <CategoryBar category={category} key={category.id}/>
                                <Row className="mt-4 ms-2 me-2">
                                    {
                                        applications.map((app) =>
                                            app.map((item) =>
                                                item.id === category.id &&
                                                <ProgramCard app={item} key={item.id}/>
                                            )
                                        )
                                    }
                                </Row>
                            </div>
                        )
                    }
                </Col>
            </Container>
        </div>
    );
};

export default Catalog;