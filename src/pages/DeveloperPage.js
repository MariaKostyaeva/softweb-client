import React, {useContext, useEffect, useState} from 'react';
import SideBar from "../components/SideBar/SideBar";
import AllAppTable from "../components/componentsOnPageDeveloper/AllAppTable";
import CreateAppForm from "../components/componentsOnPageDeveloper/CreateAppForm";
import Statistics from "../components/componentsOnPageDeveloper/Statistics";
import {Context} from "../index";
import {check} from "../http/userAPI";
import Loader from "../components/Loader/Loader";

const DeveloperPage = () => {
    const [itemId, setItemId] = useState(1);
    const {user} = useContext(Context);
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        check().then(() => {
            user.setUser(true)
            user.setIsAuth(true)
            if(userInfo !== null){
                user.setUserId(userInfo['id']);
                user.setUsername(userInfo['fullName']);
            }
        }).finally(() => setLoading(false))
    }, []);

    if(loading){
        return <Loader/>
    }
    const renderSwitch = (param) => {
        switch(param) {
            case 1:
                return <AllAppTable/>;
            case 2:
                return <Statistics/>;
            case 3:
                return <CreateAppForm/>;
        }
    }
    return (
        <div className="m-4 d-flex flex-row">
            <SideBar setItemId={setItemId}/>
            <div className="d-flex w-100 ms-4 overflow-hidden">
                {renderSwitch(itemId)}
            </div>
        </div>
    );
};

export default DeveloperPage;