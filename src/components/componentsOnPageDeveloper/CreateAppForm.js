import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Select, {OnChangeValue} from "react-select";
import {$authHost, $host} from "../../http";
import {Buffer} from "buffer";
import {addNewApp} from "../../http/userAPI";


const CreateAppForm = () => {

    const [applicationId] = useState('1');
    const [logo,setLogo] = useState('');
    const [name,setName] = useState('');
    const [shortDescription,setShortDescription] = useState('');
    const [longDescription,setLongDescription] = useState('');
    const [licenses,setLicenses] = useState([]);
    const [currentLicense,setCurrentLicense] = useState('');
    const [categories,setCategories] = useState([]);
    const [currentCategory,setCurrentCategory] = useState('');
    const [images,setImages] = useState([]);
    const [applicationInfo,setApplicationInfo] = useState([]);
    const [installer,setInstaller] = useState('');
    const [version,setVersion] = useState('');
    const [systemId] = useState('1');

    console.log(applicationInfo)
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


    const getInfoAboutApp = () => {
        const appInfo = {
            logo,
            name,
            shortDescription,
            longDescription,
            currentLicense,
            currentCategory
        };
        setApplicationInfo([appInfo]);
    }

    const addApp = async (e) => {
       e.preventDefault();
       getInfoAboutApp();

        // const appImages = {
        //     images,
        //     applicationId
        // };
        // setImages([appImages]);
        //
        // const appInstaller = {
        //     installer,
        //     applicationId,
        //     systemId,
        //     version
        // }
        // setInstaller([appInstaller])
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
                    onChange={e => setImages(e.target.files)}
                />
            </Form.Group>
            <Form.Group controlId="appInstaller" className="mb-3">
                <Form.Label>Добавьте свое приложение</Form.Label>
                <Form.Control
                    type="file"
                    className="rounded-0"
                    value={installer}
                    onChange={e => setInstaller(e.target.value)}
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