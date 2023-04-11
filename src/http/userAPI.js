import {$host} from "./index";
import { Buffer } from 'buffer';
import axios from "axios";
import {Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../routes/consts";

export const registration = async (username, fullName, password) => {
    await axios($host.post('store/v1/user', {username, fullName, password, isAdmin:false}))
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error.toString())
        })
}

export const authorization = async (username, password) => {
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
    }
}

export const check = async () => {
    return localStorage.getItem('user');
}



