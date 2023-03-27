import React, {useEffect, useState} from 'react';
import './NavBar.style.css';
import {NavLink} from "react-router-dom";
import {ABOUT_ROUTE, ACCOUNT_DETAILS_ROUTE, CATALOG_ROUTE, DEVELOPER_ROUTE, LOGIN_ROUTE} from "../../routes/consts";
import Logo from "../../assets/logo.svg";
const NavBar = () => {
    const [isActive, setIsActive] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        }
    };
    if(isMobile.any()){
        document.body.classList.add('_touch');
        let menuArrows = document.querySelectorAll('.menu_arrow');
        if(menuArrows.length > 0){
            for (let index = 0; index < menuArrows.length; index++){
                const menuArrow = menuArrows[index];
                menuArrow.addEventListener('click',function ()  {
                    menuArrow.parentElement.classList.toggle('_active');
                });
            }
        }
    } else {
        document.body.classList.add('_pc');
    }

    useEffect(() => {
        document.body.classList.toggle('_lock', isOpen);
    },[isOpen])

    const handleClick = event => {
        setIsActive(current => !current);
        setIsOpen(!isOpen);
    }

    return (
        <header className="header">
            <div className="header_container ms-4 me-4">
                <div className="header_logo-box">
                    <NavLink to={CATALOG_ROUTE}><img src={Logo} className="header_logo-img"/></NavLink>
                    <NavLink to={CATALOG_ROUTE} className="header_logo">SoftWeb</NavLink>
                </div>
                <div className="header_menu">
                    <div className={isActive ? 'menu_icon _active' : 'menu_icon'} onClick={handleClick}>
                        <span></span>
                    </div>
                    <nav className={isActive ? 'menu_body _active' : 'menu_body'}>
                        <ul className="menu_list">
                            <li><NavLink to={CATALOG_ROUTE} className="menu_link">Магазин</NavLink></li>
                            <li><NavLink to={ABOUT_ROUTE} className="menu_link">О сайте</NavLink></li>
                            <li>
                                <NavLink to={LOGIN_ROUTE} className="menu_link"><i className="fa-regular fa-user me-2"></i>Аккаунт разработчика</NavLink>
                                <span className={isActive ? 'menu_arrow _active' : 'menu_arrow'}></span>
                                <ul className="menu_sub-list">
                                    <li><NavLink to={DEVELOPER_ROUTE} className="menu_sub-link">Управление приложениями</NavLink></li>
                                    <li><NavLink to={ACCOUNT_DETAILS_ROUTE} className="menu_sub-link">Данные учетной записи</NavLink></li>
                                    <li><NavLink className="menu_sub-link">Выход</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};
export default NavBar;