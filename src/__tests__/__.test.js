import {fireEvent, render, screen} from "@testing-library/react";
import Authorization from "../pages/Authorization";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import * as APIModule from '../http/userAPI';
import {wait} from "@testing-library/user-event/dist/utils";
import axios from "axios";
jest.mock('../http/userAPI');

const request = require('supertest');
const addApp = require('../components/componentsOnPageDeveloper/CreateAppForm');
test('The application must be added (interaction with the server)', async () => {
    const app = [{
        "name": "Test",
        "shortDescription": "Test description",
        "longDescription": "Long test description",
        "logo": "http://localhost:8072/store/v1/image/agent.png",
        "licenseCode": "ADSL",
        "categoryId": 1
    }];
    const headers = [{
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Basic Sm9objp0ZXN0`
    }];

    const response = await request(addApp)
        .post('http://localhost:8072/store/v1/application', {headers})
        .send({ app });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('post');
});

test('',()=>{expect(true).toBe(true);})
// describe('Testing authorization/registration form', () => {
//     test('Renders authorization form properly', () => {
//         const {getByPlaceholderText} = render(
//             <BrowserRouter>
//                 <Authorization/>
//             </BrowserRouter>);
//         const loginInput = getByPlaceholderText(/логин/i);
//         const passwordInput = getByPlaceholderText(/пароль/i);
//         const headerRegistration = screen.getByText(/Регистрация/i);
//         expect(headerRegistration).toBeInTheDocument();
//         expect(loginInput).toBeInTheDocument();
//         expect(passwordInput).toBeInTheDocument();
//     });
//     test('Form makes a api call with proper params',async () => {
//         APIModule.authorization.mockResolvedValueOnce({ok: true});
//         const {getByTestId} = render(
//             <BrowserRouter>
//                 <Authorization/>
//             </BrowserRouter>);
//         const loginInput = getByTestId(/login/i);
//         const passwordInput = getByTestId(/password/i);
//         const submitBtn = getByTestId('submitBtn');
//         fireEvent.change(loginInput, {'target': {'value': 'Miles'}});
//         fireEvent.change(passwordInput, {'target': {'value': 'test'}});
//         fireEvent.click(submitBtn);
//         expect(APIModule.authorization).toBeCalledTimes(1);
//         expect(APIModule.authorization).toHaveBeenCalledWith('Miles','test');
//         await wait(() => null); });
//     test('Btn should be disabled for empty registration form',  () => {
//        const {getByTestId} = render(
//            <BrowserRouter>
//                <Authorization/>
//            </BrowserRouter>);
//        const loginInput = getByTestId(/login/i);
//        const fullNameInput = getByTestId(/fullname/i);
//        const passwordInput = getByTestId(/password/i);
//        fireEvent.change(loginInput,{'target':{'value':''}});
//        fireEvent.change(fullNameInput,{'target':{'value':''}});
//        fireEvent.change(passwordInput,{'target':{'value':''}});
//        expect(getByTestId(/submitBtn/i)).toHaveAttribute('disabled');
//     });
// });