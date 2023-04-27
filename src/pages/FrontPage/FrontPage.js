import React, {useEffect, useState} from 'react';
import './FrontPage.style.css'
import Search from "../../components/Search";
import {CATALOG_ROUTE, CATEGORY_ROUTE} from "../../routes/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {$host} from "../../http";
import ProgramCardMainPage from "../../components/ProgramCardMainPage";
import {Button} from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import search from "../../components/Search";

const FrontPage = () => {
    const [applications,setApplications] = useState([]);
    const [selected,setSelected] = useState(1);
    const [isAppLoading,setIsAppLoading] = useState(false);
    const navigate = useNavigate();

    const selectItem = (position) => {
        if (!position) {
            setSelected(null)
        } else {
            setSelected(position)
        }
        fetchAppByCategory(position)
    }

    const getCurrentCategory = () => {
        switch (selected){
            case 1: return 'Раздел "Разработка"';
                break;
            case 2: return 'Раздел "Игры"';
                break;
            case 3: return 'Раздел "Творчество"';
                break;
            case 5: return 'Раздел "Продуктивность"';
                break;
        }
    }

    async function fetchAppByCategory(position){
        try{
            setIsAppLoading(true);
            const response = await $host.get(`store/v1/application/category?page=0&size=3&sort=id,asc&categoryId=${position}`);
            setApplications(response.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAppByCategory(selected);
    }, [])

    return (
        isAppLoading
            ? <Loader/>
            :
            <div className="w-100">
                <div className="w-100 d-flex main-container h-auto">
                    <div className="d-flex justify-content-between w-75 m-auto flex-column m-5 p-5">
                        <h2 className="text-color" style={{fontWeight:200}}>Мультиплатформенный магазин приложений</h2>
                        <div className="search-box mb-4">
                            <Search/>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap">
                            <div className="col-12 col-md-6">
                                <p className="text-color">Некоторые приложения, которые вам могут понравиться</p>
                            </div>
                            <div className="col-12 col-md-6 box">
                                <p><NavLink to={`/category/${selected}`} className="text-color link">{getCurrentCategory()}</NavLink></p>
                            </div>
                        </div>
                        <div className="w-100 programCard-box">
                            {
                                applications.map((app) =>
                                    <div className="m-auto w-100 d-flex justify-content-center" key={app.id}>
                                        <ProgramCardMainPage app={app} key={app.id}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className="category-box w-100 h-100 pb-4 pt-3">
                            <div className={selected === 1 ? 'active-item me-4': 'line me-4'}>
                                <NavLink className="rounded-0 btn-link w-100 pt-1 pb-2" key={1} onClick={() => selectItem(1)}><span className="text">Разработка</span></NavLink>
                            </div>
                            <div className={selected === 3 ? 'active-item me-4': 'line me-4'}>
                                <NavLink className="rounded-0 btn-link w-100 pt-1 pb-2" key={3} onClick={() => selectItem(3)}><span className="text">Творчество</span></NavLink>
                            </div>
                            <div className={selected === 2 ? 'active-item me-4': 'line me-4'}>
                                <NavLink className="rounded-0 btn-link w-100 pt-1 pb-2" key={2} onClick={() => selectItem(2)}><span className="text">Игры</span></NavLink>
                            </div>
                            <div className={selected === 5 ? 'active-item': 'line'}>
                                <NavLink className="rounded-0 btn-link w-100 pt-1 pb-2" key={5} onClick={() => selectItem(5)}><span className="text">Продуктивность</span></NavLink>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            <Button className="rounded-0 ps-4 pe-4 p-2 m-auto btn-light" onClick={() => navigate(CATALOG_ROUTE)}>Просмотреть все программы</Button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default FrontPage;