import React, {useEffect, useState} from 'react';
import '../pages/ProgramPage/ProgramPage.style.css';
import {$host} from "../http";
import {Row} from "react-bootstrap";
import Loader from "../components/Loader/Loader";

const SearchPage = (props) => {
    const [qtySearchApp,setQtySearchApp] = useState(1);
    const [applications,setApplications] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);

    async function fetchApp(){
        try{
            setIsAppLoading(true);
            const response = await $host.get(`store/v1/application?sort=id,name,asc`);
            setApplications(response.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchApp();
    },[])

    return (
        <div className="w-100">
            <div className="installation-container">
                <div className="search-box d-flex justify-content-between w-75 m-auto flex-column m-5 p-5 ps-0 pe-0">
                    {/*<Search value={value} placeholder={placeholder} onChange={onChange}/>*/}
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
                        <Row className="m-auto">
                            {/*{*/}
                            {/*    applications.filter((app) => {*/}
                            {/*        return searchParam.some((newItem) => {*/}
                            {/*            return (*/}
                            {/*                app[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1 &&*/}
                            {/*                    <ProgramCard app={app} key={app.id}/>*/}
                            {/*            );*/}
                            {/*        });*/}
                            {/*    })*/}
                            {/*}*/}
                        </Row>
                    </div>
            }
        </div>
    );
};

export default SearchPage;