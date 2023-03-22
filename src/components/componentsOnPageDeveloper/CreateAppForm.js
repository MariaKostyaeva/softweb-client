import React, {useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {login, registration} from "../../http/userAPI";
import axios, {post} from "axios";

const CreateAppForm = () => {

    const [logo,setLogo] = useState('');
    const [name,setName] = useState('');
    const [shortDescription,setShortDescription] = useState('');
    const [longDescription,setLongDescription] = useState('');
    const [licenseCode,setLicenseCode] = useState('1');
    const [categoryId,setCategoryId] = useState('1');
    const [images,setImages] = useState('');
    const [id] = useState('1');

    const createNewApp = async () => {
        console.log(logo,name,shortDescription,longDescription,licenseCode,categoryId)
        const response = await axios.post('http://localhost:8072/store/v1/application');
        console.log(response)
    }

    return (
        <Form className="w-100 mb-4">
            <h5>Добавление приложения</h5>
            <hr/>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appName">Наименование приложения</Form.Label>
                <Form.Control
                    className="rounded-0"
                    id="appName"
                    placeholder="Введите наименование приложения"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appLicense">Лицензия</Form.Label>
                <Form.Select
                    id="appLicense"
                    className="rounded-0"
                    value={licenseCode}
                    onChange={e=>setLicenseCode(licenseCode)}
                >
                    <option>The Parity Public License 7.0.0 (Parity-7.0.0)</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appShortDescription">Краткая информация</Form.Label>
                <Form.Control
                    className="rounded-0"
                    id="appShortDescription"
                    placeholder="Опиши меня в двух словах"
                    value={shortDescription}
                    onChange={e => setShortDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appLongDescription">Полное описание</Form.Label>
                <Form.Control
                    as="textarea"
                    className="rounded-0"
                    id="appLongDescription"
                    placeholder="Расскажи обо мне ;)"
                    value={longDescription}
                    onChange={e => setLongDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appCategory">Категория приложения</Form.Label>
                <Form.Select
                    id="appCategory"
                    className="rounded-0"
                    value={categoryId}
                    onChange={e => setCategoryId(categoryId)}
                >
                    <option id={1}>Разработка</option>
                    <option id={2}>Игры</option>
                    <option id={3}>Творчество</option>
                    <option id={4}>Социальные сети</option>
                    <option id={5}>Продуктивность</option>
                    <option id={6}>Безопасность</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="appImage" className="mb-3">
                <Form.Label>Иконка для приложения</Form.Label>
                <Form.Control
                    type="file"
                    className="rounded-0"
                    value={logo}
                    onChange={e => setLogo(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="appImages" className="mb-3">
                <Form.Label>Изображения приложения</Form.Label>
                <Form.Control
                    type="file"
                    className="rounded-0"
                    multiple
                />
            </Form.Group>
            <div className="d-flex justify-content-end w-100">
                <Button
                    className="btn-primary rounded-0 ps-4 pe-4"
                    variant="success"
                    onClick={createNewApp}
                >Добавить</Button>
            </div>
        </Form>
    );
};

export default CreateAppForm;