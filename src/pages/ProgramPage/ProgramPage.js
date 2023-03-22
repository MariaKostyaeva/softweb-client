import React, {useEffect, useLayoutEffect, useState} from 'react';
import stubImg from '../../assets/stub-image.svg'
import {Button, Dropdown} from "react-bootstrap";
import Slider from "../../components/Slider/Slider";
import './ProgramPage.style.css';
import image from '../../assets/logo.svg'
import {useParams} from "react-router-dom";
import axios from "axios";
import {number} from "prop-types";
import Loader from "../../components/Loader/Loader";
import AppInfo from "../../components/AppInfo";
import ProgramCard from "../../components/ProgramCard";

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