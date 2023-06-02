import React, {useEffect, useState} from 'react';
import './FrontPage.style.css'
import Search from "../../components/Search";
import {CATALOG_ROUTE, SEARCH_PAGE_ROUTE} from "../../routes/consts";
import {NavLink, useNavigate} from "react-router-dom";
import {$host} from "../../http";
import ProgramCardMainPage from "../../components/ProgramCardMainPage";
import {Button} from "react-bootstrap";
import ProgramCard from "../../components/ProgramCard";

const FrontPage = () => {
    const [applications,setApplications] = useState([]);
    const [selected,setSelected] = useState(1);
    const [isAppLoading,setIsAppLoading] = useState(false);
    const [topAppByViews,setTopAppByViews] = useState([]);
    const [topAppByDownloads,setTopAppByDownloads] = useState([]);
    const [inputValue,setInputValue] = useState('');
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

    const getTopApps = async () => {
        try{
            setIsAppLoading(true);
            const mostViewedApps = await $host.get(`store/v1/application?page=0&size=20&sort=views,desc`);
            setTopAppByViews(mostViewedApps.data);
            const mostDownloadedApps = await $host.get(`store/v1/application?page=0&size=20&sort=downloads,desc`);
            setTopAppByDownloads(mostDownloadedApps.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    const handleClickSearch = (e) => {
        e.preventDefault();
        localStorage.setItem('search', inputValue);
        navigate(SEARCH_PAGE_ROUTE);
    }

    useEffect(() => {
        fetchAppByCategory(selected);
        getTopApps();
    }, [])

    return (
            <div className="w-100">
                <div className="w-100 d-flex main-container h-auto h-75">
                    <div className="d-flex justify-content-between w-75 m-auto flex-column m-5 p-5">
                        <h2 className="text-color" style={{fontWeight:200}}>Мультиплатформенный магазин приложений</h2>
                        <div className="search-box mb-4">
                            <Search value={inputValue} placeholder={"Поиск по наименованию приложения"} onChange={(e) => setInputValue(e.target.value)} onSubmit={(e) => handleClickSearch(e)}/>
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
                <div className="w-75 m-auto m-5 ps-5 pe-5">
                    <h3 style={{fontWeight: 200}}>Рекомендации</h3>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex flex-row styled-scrollbars" style={{overflowY:'scroll'}}>
                            {topAppByViews?.map((app) =>
                                <ProgramCard app={app} key={app.id}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-75 m-auto m-5 p-5">
                    <h3 style={{fontWeight: 200}}>Чаще всего скачивали</h3>
                    <div className="d-flex flex-row styled-scrollbars pb-2" style={{overflowY:'scroll'}}>
                        {topAppByDownloads?.map((app) =>
                            <ProgramCard app={app} key={app.id}/>
                        )}
                    </div>
                </div>
            </div>
    )};

export default FrontPage;