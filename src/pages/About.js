import {Container} from "react-bootstrap";
import React from 'react';
import Logo from '../assets/logo.svg';
import aboutForUsers from '../assets/about_for_users.svg';
import aboutForDevelopers from '../assets/about_for_developers.svg';

const About = () => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center w-100">
            <div className="m-4 p-4 mt-0 pt-0">
                <div className="d-flex flex-column align-items-center">
                    <img src={Logo} style={{width: 300, height: 300}}/>
                    <h5 style={{fontSize:48}}>SoftWeb</h5>
                </div>
                <hr/>
                <div style={{minWidth: 250}}>
                    <p style={{textAlign:"justify", textIndent: 45}}>
                        <i>«SoftWeb»</i> – это интернет-магазин приложений на базе облачной архитектуры. Данная платформа позволяет разработчикам загружать и продвигать свои программные продукты, а пользователям заполучать желаемый программный продукт.
                    </p>
                    <p style={{textAlign:"justify", textIndent: 45}}>
                        На данный момент любое программное обеспечение, выпускаемое разработчиком, предназначено для дальнейшего размещения на различных площадках, многие из которых сами требуют установки на устройство пользователя. Программная система предназначена для автоматизации получения различного программного обеспечения на компьютеры пользователя и упрощения размещения разработчиком своего программного продукта, не требуя при этом установки самой системы.
                        Система поддерживает размещение приложений под разные платформы, включая Windows, Android, IOS, а также некоторые дистрибутивы Linux.
                    </p>
                </div>
                <hr/>
                <div className="d-flex justify-content-between flex-wrap">
                    <div className="m-auto mt-0">
                        <h5>Пользователям</h5>
                        <p>
                            <i className="fa fa-check me-4 mt-2 mb-2"/> Просмотр списка допустимых к установке приложений
                            <br/>
                            <i className="fa fa-check me-4 mt-2 mb-2"/> Просмотр информации о приложениях
                            <br/>
                            <i className="fa fa-check me-4 mt-2 mb-2"/> Скачивание выбранного программного обеспечения на компьютер
                            <br/>
                        </p>
                    </div>
                    <div className="m-auto">
                        <img src={aboutForUsers} style={{minWidth:300,width:500, height:370, backgroundSize:"cover"}}/>
                    </div>
                </div>
                <hr/>
                <div className="d-flex justify-content-between flex-wrap flex-row-reverse">
                    <div className="m-auto mt-0" style={{maxWidth: 520}}>
                        <h5>Разработчикам</h5>
                        <p>
                            <i className="fa fa-check me-4 mt-2 mb-2"/> Загружать собственное ПО в систему
                            <br/>
                            <i className="fa fa-check me-4 mt-2 mb-2"/> В случае необходимости, редактировать информацию о приложениях
                            <br/>
                            <i className="fa fa-check me-4 mt-2 mb-2"/> Удалять приложение из системы с последующим удалением всей информации о нем
                            <br/>
                        </p>
                    </div>
                    <div className="m-auto">
                        <img src={aboutForDevelopers} style={{minWidth:300,width:600, height:400, backgroundSize:"cover"}}/>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default About;