import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CategoryBar from "../components/CategoryBar/CategoryBar";
import ProgramCard from "../components/ProgramCard";
import Loader from "../components/Loader/Loader";
import {$host} from "../http";
import Search from "../components/Search";
import axios from "axios";

const Catalog = () => {

    const [categories,setCategory] = useState([]);
    const [applications,setApplications] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);
    const [searchData,setSearchData] = useState('');
    let items = [];

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
                const response = await axios.get(`http://localhost:8072/store/v1/application/category?page=0&size=6&sort=id,asc&categoryId=${i}`);
                localStorage.setItem(`${i}`, JSON.stringify(response.data))
            }
            setIsAppLoading(false);
        } catch (e) {
            console.log(e.toString())
        }
    }

    const getApp = (category) => {
        items = JSON.parse(localStorage.getItem(`${category.id}`));
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
                            <Search placeholder="Поиск по названию приложения" value={searchData} onChange={e => setSearchData(e.target.value)}/>
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
                                <Row className="mt-4 mb-3 ms-2 me-2">
                                    {getApp(category)}
                                    {
                                        items.map((app) =>
                                            <ProgramCard app={app} key={app.id}/>
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