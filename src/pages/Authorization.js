import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CATALOG_ROUTE, DEVELOPER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../routes/consts";
import '../assets/App.css';
import {authorization, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Authorization = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [username,setUserName] = useState('');
    const [fullName,setFullName] = useState('');
    const [password,setPassword] = useState('');
    const [usernameDirty,setUserNameDirty] = useState(false);
    const [fullNameDirty,setFullNameDirty] = useState(false);
    const [passwordDirty,setPasswordDirty] = useState(false);
    const [usernameError,setUserNameError] = useState('Поле логина не может быть пустым');
    const [fullNameError,setFullNameError] = useState('Поле не может быть пустым');
    const [passwordError,setPasswordError] = useState('Поле пароля не может быть пустым');
    const [formValid,setFormValid] = useState(false);

    const userInfo = localStorage.getItem('user');

    const usernameHandler = (e) => {
        setUserName(e.target.value);
        const usernameRegex = /^[a-z]+$/i;
        if (e.target.value.length < 3){
            setUserNameError('Логин слишком короткий');
            if(!e.target.value){
                setUserNameError('Поле логина не может быть пустым');
            }
            if (!usernameRegex.test(e.target.value)){
                setUserNameError('Некорректный логин');
            }
        }
        else {
            setUserNameError('');
        }
    }

    const fullNameHandler = (e) => {
        setFullName(e.target.value);
        const fullNameRegex =  /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
        if(!isLogin){
            if(!e.target.value){
                setFullNameError('Поле не может быть пустым');
            }
            if(!fullNameRegex.test(e.target.value)){
                setFullNameError('Некорректное имя');
            }
            else {
                setFullNameError('');
            }
        }
        else {
            setFullNameError('');
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);

        if(e.target.value.length < 3 || e.target.value.length > 16){
            setPasswordError('Пароль должен содержать от 3 до 16 символов');
            if(!e.target.value){
                setPasswordError('Поле пароля не может быть пустым');
            }
        }
        else {
            setPasswordError('');
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'username': setUserNameDirty(true);
                break;
            case 'fullName': setFullNameDirty(true);
                break;
            case 'password': setPasswordDirty(true);
                break;
        }
    }

    const click = async (e) => {
        e.preventDefault();

        try {
            if(isLogin){
                await authorization(username,password);
                if(userInfo !== []){
                    navigate(DEVELOPER_ROUTE);
                    user.setUser(user);
                    user.setIsAuth(true);
                }
            } else {
                await registration(username, fullName, password);
                navigate(LOGIN_ROUTE)
            }
        } catch (e) {
            alert(e.toString())
        }

    }

    const checkFormRegistration = () => {
        if(usernameError || fullNameError || passwordError){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }

    const checkFormAuthorization = () => {
        if(usernameError || passwordError){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }

    useEffect(() => {
        if(!isLogin){
            checkFormRegistration();
        } else {
            checkFormAuthorization();
        }
    },[usernameError,fullNameError,passwordError])

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    {(usernameDirty && usernameError) && <div style={{color:"red", lineHeight:0.2, paddingTop:15}}>{usernameError}</div>}
                    <Form.Control
                        autoComplete="off"
                        className="mt-3 rounded-0"
                        type="username"
                        name="username"
                        placeholder="Логин"
                        value={username}
                        onChange={e => usernameHandler(e)}
                        onBlur={e => blurHandler(e)}
                    />
                    {!isLogin && (fullNameDirty && fullNameError) && <div style={{color:"red", lineHeight:0.2, paddingTop:15}}>{fullNameError}</div>}
                    {!isLogin &&
                        <Form.Control
                            autoComplete="off"
                            className="mt-3 rounded-0"
                            type="fullName"
                            name="fullName"
                            placeholder="Полное имя пользователя "
                            value={fullName}
                            onChange={e => fullNameHandler(e)}
                            onBlur={e => blurHandler(e)}
                        />}
                    {(passwordDirty && passwordError) && <div style={{color:"red", lineHeight:0.2, paddingTop:15}}>{passwordError}</div>}
                    <Form.Control
                        autoComplete="off"
                        className="mt-3 rounded-0"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => passwordHandler(e)}
                        onBlur={e => blurHandler(e)}
                    />
                    <Row>
                        <div className="d-flex justify-content-between align-items-center">
                            {isLogin ?
                                <p className="mt-3">Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} onClick={checkFormRegistration}>Зарегистрируйтесь!</NavLink></p>
                                :
                                <p className="mt-3 mr-1">Есть аккаунт? <NavLink to={LOGIN_ROUTE} onClick={checkFormAuthorization}>Войдите!</NavLink></p>
                            }
                            <Button
                                className="rounded-0 col-5 btn-primary text-nowrap"
                                variant="success"
                                onClick={click}
                                disabled={!formValid}
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