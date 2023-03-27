import React, { useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../routes/consts";
import '../assets/App.css';
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const Authorization = observer(() => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');


    const click = async () => {
        if(isLogin){
            const response = await login(username,password);
            console.log(response)
        } else {
            const response = await registration(username,password);
            console.log(response)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3 rounded-0"
                        type="login"
                        placeholder="Имя пользователя "
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3 rounded-0"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row>
                        <div className="d-flex justify-content-between align-items-center">
                            {isLogin ?
                                <p className="mt-3">Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink></p>
                                :
                                <p className="mt-3 mr-1">Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></p>
                            }
                            <Button
                                className="rounded-0 col-5 btn-primary text-nowrap"
                                variant="success"
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});
export default Authorization;