import React, {useEffect, useState} from 'react';
import '../pages/ProgramPage/ProgramPage.style.css';
import {$host} from "../http";
import {Row} from "react-bootstrap";
import Loader from "../components/Loader/Loader";
import Search from "../components/Search";
import axios from "axios";
import ProgramCard from "../components/ProgramCard";
import usePagination from "../hooks/usePagination";

const SearchPage = () => {
    const [qtySearchApp,setQtySearchApp] = useState('0');
    const [applications,setApplications] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);
    const [inputValue,setInputValue] = useState('');

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        totalPages,
    } = usePagination({contentPerPage: 9, count: 111});

    const handleClickSearch = (e) => {
        const q = e.target;
        setInputValue(q.search.value);
    }

    const getApp = async () => {
        setIsAppLoading(true);
        await axios.get(`http://localhost:8072/store/v1/application?page=0&size=1000&sort=id,asc`)
            .then(response => {
                setApplications(response.data);
            })
            .catch(e => console.log(e.toString()));
        setIsAppLoading(false);
    }

    const getFilteredData = () => {
        applications[0-99]?.filter(app => app.name.includes(inputValue).toLowerCase()).slice(firstContentIndex,lastContentIndex).map((el) => (
            <ProgramCard app={el} key={el.id}/>
        ))
    }

    useEffect((e) => {
        getApp(e);
    },[])

    return (
        <div className="w-100">
            <div className="installation-container">
                <div className="search-box d-flex justify-content-between w-75 m-auto flex-column m-5 p-5 ps-0 pe-0">
                    <Search value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={"Поиск по наименованию приложения"} onSubmit={(e) => handleClickSearch(e)}/>
                </div>
            </div>
            {
                isAppLoading
                    ? <Loader/>
                    :
                    <div className="d-flex justify-content-center flex-column align-items-center w-75 mt-4 mb-4 m-auto">
                        <div className="w-100 ms-5">
                            <h2 style={{fontWeight:200}}>{qtySearchApp !== 0 ? `Мы нашли ${qtySearchApp} приложений по вашему запросу` : `Мы не смогли ничего найти по вашему запросу ${qtySearchApp}`}</h2>
                        </div>
                        <Row className="mt-4 ms-2 me-2">
                            {
                                getFilteredData()
                            }
                        </Row>
                        <div className="d-flex w-100 justify-content-between mt-4 mb-4">
                            {
                                lastContentIndex !== 9 && <div className="d-flex align-items-center justify-content-start w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={prevPage}><i className="fa fa-chevron-left m-2 ms-0"/>Предыдущая страница</button></div>
                            }
                            {
                                page !== totalPages && <div className="d-flex align-items-center justify-content-end w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={nextPage}>Следующая страница<i className="fa fa-chevron-right m-2 me-0"/></button></div>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default SearchPage;