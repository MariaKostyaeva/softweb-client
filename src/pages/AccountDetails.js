import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {$authHost} from "../http";
import {Context} from "../index";
import EditAppForm from "../components/EditAppForm";
import EditUserData from "../components/EditUserData";
import axios from "axios";
import {Buffer} from "buffer";
import {check} from "../http/userAPI";
import Loader from "../components/Loader/Loader";
import {Button} from "react-bootstrap";
import {LOGIN_ROUTE} from "../routes/consts";

const AccountDetails = () => {
    const {user} = useContext(Context);
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const [totalAppInfo, setTotalAppInfo] = useState([]);
    const security = JSON.parse(localStorage.getItem('authData'));
    const [isActive,setIsActive] = useState(false);
    const navigate = useNavigate();

    const encodedCred = Buffer.from(security['username'] + ':' + security['password']).toString('base64');
    const headers = {
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Authorization': `Basic ${encodedCred}`
    };
    const [editFormData, setEditFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const fetchAppInfoByUserId = async () => {
        try{
            const response = await $authHost.get(`store/v1/application/user/info?size=5&userId=${user._userId}`);
            setTotalAppInfo(response.data);
        }
        catch (e){
            console.log(e);
        }
    }

    const formatDate = (newDate) => {
        const date = new Date(`${newDate['0']}` ,`${newDate[1]-1}`, `${newDate[2]}`, `${newDate[3]}`, `${newDate[4]}`);
        const longRuRUFormatter = new Intl.DateTimeFormat('ru-RU',{
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
        return longRuRUFormatter.format(date);
    }

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.currentTarget.name;
        const fieldValue = e.currentTarget.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const closeModal = () => {
        setIsActive(false);
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        const formValues = {
            fullName: userInfo.fullName,
            username: userInfo.username,
            password: '',
            newPassword: '',
            confirmPassword: ''
        }
        setEditFormData(formValues);

        setIsActive(true);
    }

    const saveUserData = async (e) => {
        e.preventDefault();
        const userFormData = new FormData();
        userFormData.append('id', user._userId);
        userFormData.append('username', editFormData.username);
        userFormData.append('fullName', editFormData.fullName);
        if(editFormData.newPassword === editFormData.confirmPassword) {
            userFormData.append('password', editFormData.newPassword);
        } else {
            alert('Пароли различны. Проверьте введенные данные');
        }
        userFormData.append('isAdmin', `${user._isAdmin}`);

        if(editFormData.password === ''){
            alert('Укажите текущий пароль')
        } else {
            await axios.put('http://localhost:8072/store/v1/user', userFormData, {headers})
                .then(response => {
                    console.log(response)
                    if(response.status === 200){
                        localStorage.setItem('user', JSON.stringify(response.data));
                        if(editFormData.newPassword === ''){
                            localStorage.setItem('authData', JSON.stringify({username:editFormData.username, password:editFormData.password}));
                        }
                        else {
                            localStorage.setItem('authData', JSON.stringify({username:editFormData.username, password:editFormData.newPassword}));
                        }
                        alert('Данные успешно изменены!');
                        setIsActive(false);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }

    const deleteUserData = async (e) => {
        e.preventDefault();
        if (editFormData.password === ''){
            alert('Неверный пароль');
        }
        else {
            await axios.delete(`http://localhost:8072/store/v1/user/${user._userId}`, {headers})
                .then(response => {
                    console.log(response)
                    alert('Учетная запись удалена!');
                    localStorage.removeItem('user');
                    localStorage.removeItem('authData');
                    setIsActive(false);
                    navigate(LOGIN_ROUTE);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }

    useEffect(() => {
        fetchAppInfoByUserId();
    },[])

    return (
        <div className="mt-4 mb-4 d-flex justify-content-between w-75 m-auto flex-column">
            <EditUserData
                active={!!isActive}
                editFormData={editFormData}
                handleEditFormChange={handleEditFormChange}
                onEdit={e => saveUserData(e)}
                onDelete={e => deleteUserData(e)}
                onClose={closeModal}/>
            <div className="d-flex justify-content-between align-items-stretch w-100 h-100">
                <h3 style={{fontWeight:200}} className="w-auto">Данные учетной записи</h3>
                <div className="m-auto ms-0 me-0"><NavLink className="link-hover" onClick={(e) => handleEditClick(e)}>Редактировать сведения</NavLink></div>
            </div>
            <hr/>
            <div>
                <div className="d-flex flex-row align-items-stretch mb-4">
                    <p style={{width:100}}>Имя пользователя:</p>
                    <div className="d-flex flex-column ms-5 m-auto">
                        <h5 className="mb-3">{userInfo.fullName}</h5>
                        <div>Кого ваши пользователи будут видеть в качестве издателя ваших приложений.</div>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-stretch mb-4">
                    <p style={{width:100}}>Ваш логин:</p>
                    <div className="d-flex flex-column ms-5 m-auto">
                        <h5 className="mb-3">{userInfo.username}</h5>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-stretch mb-4">
                    <p style={{width:100}}>Пароль:</p>
                    <div className="d-flex flex-column ms-5 m-auto">
                        <h5 className="mb-3" style={{WebkitTextSecurity: 'disc'}}>{security['password']}</h5>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-stretch w-100 h-100">
                <h3 style={{fontWeight:200}} className="w-auto">Дополнительные сведения</h3>
            </div>
            <hr/>
            <div>
                <div className="d-flex flex-row align-items-stretch mb-4">
                    <p style={{width:300}}>Дата и время последнего посещения:</p>
                    <div className="d-flex flex-column ms-5 m-auto">
                        <h5 className="mb-4">{formatDate(userInfo.lastEntered)}</h5>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-stretch mb-4">
                    <p style={{width:300}}>Количество опубликованных приложений:</p>
                    <div className="d-flex flex-column ms-5 m-auto">
                        <h5 className="mb-4">{totalAppInfo['total']}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;