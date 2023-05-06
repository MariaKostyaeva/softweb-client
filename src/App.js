import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import './assets/App.css';
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Loader from "./components/Loader/Loader";
import FrontPage from "./pages/FrontPage/FrontPage";

const App = observer(() => {
    const {user} = useContext(Context);
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        check().then(() => {
            if(userInfo !== null){
                user.setUser(true);
                user.setIsAuth(true);
                if(userInfo.authority.name === 'USER'){
                    user.setIsAdmin(false);
                } else {
                    user.setIsAdmin(true);
                }
                user.setUserId(userInfo['id']);
                user.setUsername(userInfo['fullName']);
            }
        }).finally(() => setLoading(false))
    }, []);

    if(loading){
        return <Loader/>
    }
    return (
        <div className="page-container">
            <BrowserRouter>
                <NavBar/>
                <div className="content-wrap">
                    <AppRouter>
                        <FrontPage/>
                    </AppRouter>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>
    );
})
export default App;
