import React, {useContext} from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
import {adminRoutes, devRoutes, publicRoutes} from "../routes";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && user.isAdmin && adminRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element/>} exact/>
            )}
            {devRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element/>} exact/>
            )}
            {publicRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element/>} exact/>
            )}
        </Routes>
    );
};
// user.isAuth &&
export default AppRouter;