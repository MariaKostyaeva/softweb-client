import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false;
        this._isAdmin = false;
        this._user = {};
        this._userId = '';
        this._username = '';
        makeAutoObservable(this)
    }
    setIsAuth(bool){
        this._isAuth = bool
    }
    setIsAdmin(bool){
        this._isAdmin = bool
    }
    setUser(user){
        this._user = user
    }

    setUserId(int){
        this._userId = int
    }
    setUsername(string){
        this._username = string
    }

    get isAuth(){
        return this._isAuth
    }
    get isAdmin(){
        return this._isAdmin
    }
    get user(){
        return this._user
    }
    getUserId(){
        return this._userId
    }

    getUsername(){
        return this._username
    }
}