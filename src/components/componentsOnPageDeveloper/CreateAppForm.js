import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Select, {OnChangeValue} from "react-select";
import {$authHost, $host} from "../../http";
import {Buffer} from "buffer";
import axios from "axios";


const CreateAppForm = () => {

    const [logo,setLogo] = useState(null);
    const [name,setName] = useState('');
    const [shortDescription,setShortDescription] = useState('');
    const [longDescription,setLongDescription] = useState('');
    const [licenses,setLicenses] = useState([]);
    const [currentLicense,setCurrentLicense] = useState('');
    const [categories,setCategories] = useState([]);
    const [currentCategory,setCurrentCategory] = useState('');
    const [images,setImages] = useState(null);
    const [installer,setInstaller] = useState(null);
    const [version,setVersion] = useState('');
    const [systemId,setSystemId] = useState('1');


    const userAuthData = JSON.parse(localStorage.getItem('authData'));
    const encodedCred = Buffer.from(userAuthData.username + ':' + userAuthData.password).toString('base64');
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Basic ${encodedCred}`
    };

    const fetchData = async () => {
        try{
            const license = await $authHost.get(`store/v1/license`);
            setLicenses(license.data);
            const category = await $authHost.get('store/v1/category');
            setCategories(category.data);
        }
        catch (e){
            console.log(e.toString());
        }
    }

   const optionsForLicense = [];
    licenses.map(license => {
        optionsForLicense.push({
            value: license.code,
            label: license.name
        })
    });

    const optionsForCategory = [];
     categories.map(category => {
        optionsForCategory.push({
            value: category.id,
            label: category.name
        })
    });

   const getLicenseValue = () => {
       return currentLicense ? optionsForLicense.find(l => l.label === currentLicense) : '';
   }
   const onChangeLicense = (newValue:any) => {
       setCurrentLicense(newValue.value);
   }

    const getCategoryValue = () => {
       return currentCategory ? optionsForCategory.find(c => c.label === currentCategory) : '';
    }
    const onChangeCategory = (newValue:any) => {
       setCurrentCategory(newValue.value)
    }

    const addInstaller = async (id) => {
        const installerFormData = new FormData();
        installerFormData.append('file', installer);
        installerFormData.append('applicationId', id);
        installerFormData.append('systemId', systemId);
        installerFormData.append('version', version);

        await axios.post('http://localhost:8072/store/v1/installer/upload', installerFormData, {headers})
            .then(response => {
                alert('Установщики успешно добавлены!');
                console.log(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    const addImages = async (id) => {
        const appImagesFormData = new FormData();
        appImagesFormData.append('files', images);
        appImagesFormData.append('applicationId', id);

        await axios.post('http://localhost:8072/store/v1/image/uploadMultiple', appImagesFormData, {headers})
            .then(response => {
                alert('Изображения успешно добавлены!');
                console.log(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const addApp = async (e) => {
       e.preventDefault();
       const appFormData = new FormData();
       appFormData.append('logo', logo);
        appFormData.append('name', name);
        appFormData.append('shortDescription', shortDescription);
        appFormData.append('longDescription', longDescription);
        appFormData.append('licenseCode', currentLicense);
        appFormData.append('categoryId', currentCategory);


        await axios.post('http://localhost:8072/store/v1/application', appFormData, {headers})
            .then(response => {
                addInstaller(response.data['id']);
                addImages(response.data['id']);
                console.log(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

   useEffect(() => {
       fetchData();
   },[])

   return (
        <Form className="w-100 mb-4">
            <h5>Добавление приложения</h5>
            <hr/>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appName">Наименование приложения</Form.Label>
                <Form.Control
                    className="rounded-0"
                    id="appName"
                    autoComplete="off"
                    placeholder="Введите наименование приложения"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appLicense">Лицензия</Form.Label>
                <Select
                    options={optionsForLicense}
                    onChange={onChangeLicense}
                    value={getLicenseValue()}
                    noOptionsMessage={({inputValue}) => !inputValue ? {optionsForLicense} : "Лицензия не найдена"}
                    placeholder="Выберите лицензию"
                    theme={
                        theme => ({
                            ...theme,
                            borderRadius:0
                        })
                    }
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appShortDescription">Краткая информация</Form.Label>
                <Form.Control
                    autoComplete="off"
                    className="rounded-0"
                    id="appShortDescription"
                    placeholder="Опишите меня в двух словах"
                    value={shortDescription}
                    onChange={e => setShortDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appVersion">Укажите версию приложения</Form.Label>
                <Form.Control
                    autoComplete="off"
                    className="rounded-0"
                    id="appVersion"
                    placeholder="Тут должна быть версия"
                    value={version}
                    onChange={e => setVersion(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appLongDescription">Полное описание</Form.Label>
                <Form.Control
                    as="textarea"
                    className="rounded-0"
                    id="appLongDescription"
                    placeholder="Расскажите обо мне ;)"
                    value={longDescription}
                    onChange={e => setLongDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appCategory">Категория приложения</Form.Label>
                <Select
                    options={optionsForCategory}
                    onChange={onChangeCategory}
                    value={getCategoryValue()}
                    noOptionsMessage={({inputValue}) => !inputValue ? {optionsForCategory} : "Категория не найдена"}
                    placeholder="Выберите категорию"
                    theme={
                        theme => ({
                            ...theme,
                            borderRadius:0
                        })
                    }
                />
            </Form.Group>
            <Form.Group controlId="appImage" className="mb-3">
                <Form.Label>Иконка для приложения</Form.Label>
                <Form.Control
                    type="file"
                    className="rounded-0"
                    onChange={e => setLogo(e.target.files[0])}
                    accept="image/*,.png,.jpg,.gif,.web,.svg"
                />
            </Form.Group>
            <Form.Group controlId="appImages" className="mb-3">
                <Form.Label>Изображения приложения</Form.Label>
                <Form.Control
                    type="file"
                    className="rounded-0"
                    multiple
                    accept="image/*,.png,.jpg,.gif,.web,.svg"
                    onChange={e => setImages(e.target.files)}
                />
            </Form.Group>
            <Form.Group controlId="appInstaller" className="mb-3">
                <Form.Label>Добавьте свое приложение</Form.Label>
                <Form.Control
                    type="file"
                    className="rounded-0"
                    accept=".exe,.deb,.tar.gz,.apk,.ipa"
                    onChange={e => setInstaller(e.target.files[0])}
                />
            </Form.Group>
            <div className="d-flex justify-content-end w-100">
                <Button
                    className="btn-primary rounded-0 ps-4 pe-4"
                    variant="success"
                    onClick={addApp}
                >Добавить</Button>
            </div>
        </Form>
    );
};

export default CreateAppForm;