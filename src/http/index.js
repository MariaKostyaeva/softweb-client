import axios from "axios";
import {config} from "@fortawesome/fontawesome-svg-core";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const authInterceptor = config => {
    console.log(config)
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}