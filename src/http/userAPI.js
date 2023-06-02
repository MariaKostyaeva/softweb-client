import { Buffer } from 'buffer';

export const registration = async (username, fullName, password) => {
    try {
        const response = fetch('http://localhost:8072/store/v1/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                username:username,
                fullName:fullName,
                password:password,
                isAdmin:false
            })
        })
            .then((response) => {
                if(response.status === 403){
                    let error = new Error('Данный логин занят');
                    error.response = response;
                    throw error;
                }
                if(response.status === 500){
                    let error = new Error('Сервер недоступен. Повторите попытку позже');
                    error.response = response;
                    throw error;
                }
                if(response.ok){
                    alert('Успешная регистрация!');
                }
            })
        return response;
    } catch (e) {
        return e.toString();
    }

}

export const authorization = async (username, password) => {
    localStorage.setItem('authData', JSON.stringify({username: username, password: password}))
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
            .then((response) => {
                window.localStorage.setItem("user", JSON.stringify(response))
                if(response.status === 401){
                    let error = new Error('Неверный логин или пароль');
                    error.response = response;
                    throw error;
                }
                if(response.status === 500){
                    let error = new Error('Сервер недоступен. Повторите попытку позже');
                    error.response = response;
                    throw error;
                }
            })
        return response;
    } catch (e) {
        return e.toString();
    }
}

export const check = async () => {
    return localStorage.getItem('user');
}