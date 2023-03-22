import {$authHost,$host} from './index.js';

export const registration = async (username,password) => {
    const response = await $host.post('store/v1/user/auth', {username,password,role:'ADMIN'})
    return response
}

export const login = async (username,password) => {
    const response = await $host.post('store/v1/user/auth', {username,password})
    return response
}

export const check = async () => {
    const response = await $host.post('store/v1/user/auth')
    return response
}