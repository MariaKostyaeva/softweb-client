import {$authHost, $host} from "./index";
import { Buffer } from 'buffer';
import data from "bootstrap/js/src/dom/data";

export const registration = async (username, password) => {
    const {data} = await $host.post('store/v1/user/auth', {username,password, role:'ADMIN'})
    return data
}

export const login = async (username, password) => {
    try {
        const encodedCred = Buffer.from(username + ':' + password).toString('base64');
        const response = fetch('http://localhost:8072/store/v1/user/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000',
                'Authorization': `Basic ${encodedCred}`,
            }
        })
            .then(response => response.json())
            .then(response => {
                window.localStorage.setItem("user", JSON.stringify(response))
            })
        return response;
    } catch (e) {
        console.log(e.toString())
        alert(`Неправильный логин или пароль.`);
    }
}

export const check = async () => {
    const userInfo = localStorage.getItem("user");
    return userInfo;
}



