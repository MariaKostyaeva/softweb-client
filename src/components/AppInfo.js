import React, {useEffect, useState} from 'react';
import {Button, Dropdown} from "react-bootstrap";
import Slider from "./Slider/Slider";
import {NavLink} from "react-router-dom";


const AppInfo = (props) => {

    const [category,setCategory] = useState([]);
    const [developer,setDeveloper] = useState([]);
    const [code,setCode] = useState([]);
    const [installers,setInstallers] = useState([]);
    const [date, setDate] = useState([]);
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const linkStyle = {
        color: '#262626',
        textDecoration: isHover ? "underline" : "none"
    };
    const getMaxVersionValue = () => {
        let id = 0;
        let version;
        installers.map((installers) => {
            if(id < installers.id){
                id = installers.id;
                version = installers.version;
            }
        })
        return version;
    }

    const getDateFormat = () => {
        let monthNumber = date[1];
        let monthName;
        switch (monthNumber) {
            case 1: monthName = "Января";
                break;
            case 2: monthName = "Февраля";
                break;
            case 3: monthName = "Марта";
                break;
            case 4: monthName = "Апреля";
                break;
            case 5: monthName = "Мая";
                break;
            case 6: monthName = "Июня";
                break;
            case 7: monthName = "Июля";
                break;
            case 8: monthName = "Августа";
                break;
            case 9: monthName = "Сентября";
                break;
            case 10: monthName = "Октября";
                break;
            case 11: monthName = "Ноября";
                break;
            case 12: monthName = "Декабря";
                break;
        }
        return `${date[2]} ${monthName} ${date[0]}`;
    }

    useEffect(() => {
        const categoryName = props.app.category;
        setCategory(categoryName);
        const developerFullName = props.app.user;
        setDeveloper(developerFullName);
        const licenseCode = props.app.license;
        setCode(licenseCode);
        const installerInfo = props.app.installers;
        setInstallers(installerInfo);
        const lastUpdate = props.app.lastUpdate;
        setDate(lastUpdate);
    },[])

    return (
        <div className="w-100">
            <div className="d-flex w-100 installation-container p-4">
                <div className="d-flex flex-wrap w-100 justify-content-between">
                    <div className="d-flex flex-nowrap">
                        <div className="p-1">
                            <img src={props.app.logoPath} style={{width:160, height:120}}/>
                        </div>
                        <div className="d-flex flex-column ms-4 m-auto">
                            <div className="app-title">{props.app.name}</div>
                            <div className="d-flex flex-row">
                                <p className="mt-1 me-1">{developer.fullName}</p>
                                <h3 style={{lineHeight:1.05}}>&#x2022;</h3>
                                <p className="mt-1 ms-1"><NavLink to={`/category/${category.id}`} style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{category.name}</NavLink></p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row ms-4">
                        <div className="d-flex flex-row flex-wrap m-auto">
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle className="rounded-0 ps-4 pe-4" variant="secondary">
                                    Доступные операционные системы
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="rounded-0 w-100">
                                    <Dropdown.Item href="#"><i className="fa-brands fa-windows icon"></i>Windows 10 <span className="extension">(.exe)</span></Dropdown.Item>
                                    <Dropdown.Item href="#"><i className="fa-brands fa-linux icon"></i>Linux <span className="extension">(.tar.gz)</span></Dropdown.Item>
                                    <Dropdown.Item href="#"><i className="fa-brands fa-ubuntu icon"></i>Ubuntu <span className="extension">(.deb)</span></Dropdown.Item>
                                    <Dropdown.Item href="#"><i className="fa-brands fa-android icon"></i>Android <span className="extension">(.apk)</span></Dropdown.Item>
                                    <Dropdown.Item href="#"><i className="fa-brands fa-apple icon"></i>iOS <span className="extension">(.ipa)</span></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button className="rounded-0 btn-primary text-nowrap ps-4 pe-4 install" variant="success">Установить</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slider-container pt-4 pb-4">
                <Slider images={props.app.images}/>
            </div>
            <div className="row m-4" style={{minWidth:320}}>
                <div className="col-12 col-md-8 mb-4">
                    <h5 className="mb-4">{props.app.shortDescription}</h5>
                    {props.app.longDescription}
                </div>
                <div className="col-12 col-md-4 mb-4">
                    <div className="title mb-4">
                        <h5>Подробная информация о {props.app.name}</h5>
                    </div>
                    <div className="license-box">
                        <div className="title-block">
                            <i className="fa fa-file-lines icon"></i>
                            <h5>Лицензия</h5>
                        </div>
                        <div className="indention">{code.code}</div>
                    </div>
                    <hr/>
                    <div className="update-box">
                        <div className="title-block">
                            <i className="fa fa-gears icon"></i>
                            <h5>Версия</h5>
                        </div>
                        <div className="indention">{getMaxVersionValue()}</div>
                    </div>
                    <hr/>
                    <div className="update-box">
                        <div className="title-block">
                            <i className="fa fa-calendar-minus icon"></i>
                            <h5>Последнее обновление</h5>
                        </div>
                        <div className="indention">{getDateFormat()}</div>
                    </div>
                    <hr/>
                    <div className="link-box">
                        <div className="title-block">
                            <i className="fa fa-eye icon"></i>
                            <h5>Количество просмотров</h5>
                        </div>
                        <div className="indention">{props.app.views}</div>
                    </div>
                    <hr/>
                    <div className="link-box">
                        <div className="title-block">
                            <i className="fa fa-download icon"></i>
                            <h5>Количество скачиваний</h5>
                        </div>
                        <div className="indention">{props.app.downloads}</div>
                    </div>
                    <hr/>
                    <div className="link-box">
                        <div className="title-block">
                            <i className="fa fa-share icon"></i>
                            <h5>Поделиться</h5>
                        </div>
                        <div className="indention">
                            <a href="#" className="social-network">Телеграмм</a>
                            <h3 style={{paddingTop:10, lineHeight:0, marginRight:5, marginLeft:5}}>&#x2022;</h3>
                            <a href="#" className="social-network">ВК</a>
                            <h3 style={{paddingTop:10, lineHeight:0, marginRight:5, marginLeft:5}}>&#x2022;</h3>
                            <a href="#" className="social-network">WhatsApp</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppInfo;