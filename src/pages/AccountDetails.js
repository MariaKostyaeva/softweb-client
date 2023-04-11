import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {$authHost} from "../http";
import {Context} from "../index";

const AccountDetails = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const [totalAppInfo, setTotalAppInfo] = useState([]);
    const fetchAppInfoByUserId = async () => {
        try{
            const response = await $authHost.get(`store/v1/application/user/info?size=5&userId=${user._userId}`);
            setTotalAppInfo(response.data);
        }
        catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAppInfoByUserId();
    },[])

    return (
        <div className="mt-4 mb-4 d-flex justify-content-between w-75 m-auto flex-column">
            <div className="d-flex justify-content-between align-items-stretch w-100 h-100">
                <h3 style={{fontWeight:200}} className="w-auto">Данные учетной записи</h3>
                <div className="m-auto ms-0 me-0"><NavLink className="link-hover">Редактировать сведения</NavLink></div>
            </div>
            <hr/>
            <div>
                <div className="d-flex flex-row align-items-stretch mb-4">
                    <p style={{width:300}}>Полное имя:</p>
                    <div className="d-flex flex-column ms-5 m-auto">
                        <h5 className="mb-2">{userInfo.fullName}</h5>
                        <div>Кого ваши пользователи будут видеть в качестве издателя ваших приложений.</div>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-stretch mb-4">
                    <p style={{width:300}}>Ваш логин:</p>
                    <div className="d-flex flex-column ms-5 m-auto">
                        <h5 className="mb-2">{userInfo.username}</h5>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-stretch w-100 h-100">
                <h3 style={{fontWeight:200}} className="w-auto">Дополнительные сведения</h3>
            </div>
            <hr/>
            <div>
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