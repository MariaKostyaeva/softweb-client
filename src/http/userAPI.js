import {$host} from "./index";

export const registration = async (username, password) => {
    const {data} = await $host.post('store/v1/user/auth', {username,password, role:'ADMIN'})
    return data
}

export const login = async (username, password) => {
    try {
        const {data} = await $host.post('store/v1/user/auth', {username, password});
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('access_token', data.access);
    } catch (e) {
        alert(`Неправильный логин или пароль. Код ошибки: ${e.response.status}`);
    }
}

export const check = async () => {
    const {data} = await $host.post('store/v1/user/auth', )
    return data
}

