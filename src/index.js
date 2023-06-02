import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";

export const Context = createContext([]);
window.addEventListener("DOMContentLoaded", function (e) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Context.Provider value={{
            user: new UserStore()
        }}>
            <App />
        </Context.Provider>
    );
});
