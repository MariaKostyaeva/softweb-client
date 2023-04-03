import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import './assets/App.css';
import NavBar from "./components/NavBar/NavBar";
import Catalog from "./pages/Catalog";
import Footer from "./components/Footer/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, login} from "./http/userAPI";
import data from "bootstrap/js/src/dom/data";
import Loader from "./components/Loader/Loader";

const App = observer(() => {
    const {user} = useContext(Context);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        check().then(() => {
            user.setUser(true)
            user.setIsAuth(true)
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
                        <Catalog/>
                    </AppRouter>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>
    );
})
export default App;
