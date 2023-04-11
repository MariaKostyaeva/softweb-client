import React, {useEffect, useState} from 'react';
import './ProgramPage.style.css';
import {useParams} from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import AppInfo from "../../components/AppInfo";

const ProgramPage = () => {
    const {id} = useParams();
    const [application, setApplication] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);
    async function fetchInfo(id){
        try{
            setIsAppLoading(true);
            const response = await axios.get(`http://localhost:8072/store/v1/application/${id}`);
            setApplication(response.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchInfo(id)
    }, [])

    return (
        <div className="w-100">
            {isAppLoading
                ? <Loader/>
                : <AppInfo app={application}/>
            }
        </div>
    );
};

export default ProgramPage;