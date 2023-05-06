import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Select, {OnChangeValue} from "react-select";
import {$authHost, $host} from "../../http";
import {Buffer} from "buffer";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AllAppTable from "./AllAppTable";


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

    const [logoDirty,setLogoDirty] = useState(false);
    const [nameDirty,setNameDirty] = useState(false);
    const [shortDescriptionDirty,setShortDescriptionDirty] = useState(false);
    const [longDescriptionDirty,setLongDescriptionDirty] = useState(false);
    const [currentLicenseDirty,setCurrentLicenseDirty] = useState(false);
    const [currentCategoryDirty,setCurrentCategoryDirty] = useState(false);
    const [imagesDirty,setImagesDirty] = useState(false);
    const [installerDirty,setInstallerDirty] = useState(false);
    const [versionDirty,setVersionDirty] = useState(false);

    const [logoError,setLogoError] = useState('Поле не может быть пустым');
    const [nameError,setNameError] = useState('Поле не может быть пустым');
    const [shortDescriptionError,setShortDescriptionError] = useState('Поле не может быть пустым');
    const [longDescriptionError,setLongDescriptionError] = useState('Поле не может быть пустым');
    const [currentLicenseError,setCurrentLicenseError] = useState('Поле не может быть пустым');
    const [currentCategoryError,setCurrentCategoryError] = useState('Поле не может быть пустым');
    const [imagesError,setImagesError] = useState('Поле не может быть пустым');
    const [installerError,setInstallerError] = useState('Поле не может быть пустым');
    const [versionError,setVersionError] = useState('Поле не может быть пустым');

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

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'logo': setLogoDirty(true);
                break;
            case 'name': setNameDirty(true);
                break;
            case 'shortDescription': setShortDescriptionDirty(true);
                break;
            case 'longDescription': setLongDescriptionDirty(true);
                break;
            case 'license': setCurrentLicenseDirty(true);
                break;
            case 'category': setCurrentCategoryDirty(true);
                break;
            case 'version': setVersionDirty(true);
                break;
            case 'images': setImagesDirty(true);
                break;
            case 'installer': setInstallerDirty(true);
                break;
        }
    }

    const addInstaller = async (id) => {
        const installerFormData = new FormData();
        installerFormData.append('file', installer);
        installerFormData.append('applicationId', id);
        installerFormData.append('version', version);

        if (installer['name'].split('.').indexOf('exe') >=0){
            installerFormData.append('systemId', '1');
        }
        if (installer['name'].split('.').indexOf('deb') >=0){
            installerFormData.append('systemId', '2');
        }
        if (installer['name'].split('.').indexOf('tar') >=0){
            installerFormData.append('systemId', '3');
        }
        if (installer['name'].split('.').indexOf('apk') >=0){
            installerFormData.append('systemId', '4');
        }
        if (installer['name'].split('.').indexOf('ipa') >=0){
            installerFormData.append('systemId', '5');
        }
        await axios.post('http://localhost:8072/store/v1/installer/upload', installerFormData, {headers})
            .then(response => {
                console.log("Установщики добавлены!",response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    const addImages = async (id) => {
        const appImagesFormData = new FormData();
        Array.from(images).forEach(file => {
           appImagesFormData.append('files', file);
        });
        appImagesFormData.append('applicationId', id);

        await axios.post('http://localhost:8072/store/v1/image/uploadMultiple', appImagesFormData, {headers})
            .then(response => {
                console.log('Изображения добавлены!',response.data)
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
                alert('Приложение успешно добавлено!');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const handleClick = async (e) => {
        await addApp(e);
        window.location.reload();
    }

    const nameHandler = (e) => {
        setName(e.target.value);

        const nameRegex = /^[a-zА-я0-9]+$/i;
        if (e.target.value.length < 3){
            setNameError('Наименование приложения слишком короткое');
            if(!e.target.value){
                setNameError('Поле не может быть пустым');
            } else if (!nameRegex.test(e.target.value)){
                setNameError('Некорректное наименование приложения');
            }
        }
        else {
            setNameError('');
        }
    }

    const shortDescriptionHandler = (e) => {
        setShortDescription(e.target.value);
        if(!e.target.value){
            setShortDescriptionError('Поле не может быть пустым');
        }
        else {
            setShortDescriptionError('');
        }
    }

    const versionHandler = (e) => {
        setVersion(e.target.value);
        const versionRegex = /^(\d+\.)?(\d+\.)?(\*|\d+)$/;
        if(!e.target.value){
            setVersionError('Поле не может быть пустым');
        } else if (!versionRegex.test(e.target.value)){
            setVersionError('Некорректное значение версии приложения');
        } else {
            setVersionError('');
        }
    }

    const longDescriptionHandler = (e) => {
        setLongDescription(e.target.value);
        if(!e.target.value){
            setLongDescriptionError('Поле не может быть пустым');
        }
        else {
            setLongDescriptionError('');
        }
    }

    const logoHandler = (e) => {
        setLogo(e.target.files[0]);
        if(!e.target.files[0]){
            setLogoError('Поле не может быть пустым');
        }
        else {
            setLogoError('');
        }
    }

    const imagesHandler = (e) => {
        setImages(e.target.files);
        if(!e.target.files){
            setImagesError('Поле не может быть пустым');
        }
        else {
            setImagesError('');
        }
    }

    const installerHandler = (e) => {
        setInstaller(e.target.files[0]);
        if(!e.target.files[0]){
            setInstallerError('Поле не может быть пустым');
        }
        else {
            setInstallerError('');
        }
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
                {(nameDirty && nameError) && <div style={{color:"red", paddingBottom:7}}>{nameError}</div>}
                <Form.Control
                    name="name"
                    className="rounded-0"
                    id="appName"
                    autoComplete="off"
                    placeholder="Введите наименование приложения"
                    value={name}
                    onChange={e => nameHandler(e)}
                    onBlur={e => blurHandler(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appLicense">Лицензия</Form.Label>
                {(currentLicenseDirty && currentLicenseError) && <div style={{color:"red", paddingBottom:7}}>{currentLicenseError}</div>}
                <Select
                    name="license"
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
                {(shortDescriptionDirty && shortDescriptionError) && <div style={{color:"red", paddingBottom:7}}>{shortDescriptionError}</div>}
                <Form.Control
                    name="shortDescription"
                    autoComplete="off"
                    className="rounded-0"
                    id="appShortDescription"
                    placeholder="Опишите меня в двух словах"
                    value={shortDescription}
                    onChange={e => shortDescriptionHandler(e)}
                    onBlur={e => blurHandler(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appVersion">Укажите версию приложения</Form.Label>
                {(versionDirty && versionError) && <div style={{color:"red", paddingBottom:7}}>{versionError}</div>}
                <Form.Control
                    name="version"
                    autoComplete="off"
                    className="rounded-0"
                    id="appVersion"
                    placeholder="Тут должна быть версия"
                    value={version}
                    onChange={e => versionHandler(e)}
                    onBlur={e => blurHandler(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appLongDescription">Полное описание</Form.Label>
                {(longDescriptionDirty && longDescriptionError) && <div style={{color:"red", paddingBottom:7}}>{longDescriptionError}</div>}
                <Form.Control
                    name="longDescription"
                    as="textarea"
                    className="rounded-0"
                    id="appLongDescription"
                    placeholder="Расскажите обо мне ;)"
                    value={longDescription}
                    onChange={e => longDescriptionHandler(e)}
                    onBlur={e => blurHandler(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="appCategory">Категория приложения</Form.Label>
                {(currentCategoryDirty && currentCategoryError) && <div style={{color:"red", paddingBottom:7}}>{currentCategoryError}</div>}
                <Select
                    name="category"
                    options={optionsForCategory}
                    onChange={onChangeCategory}
                    value={getCategoryValue()}
                    noOptionsMessage={({inputValue}) => !inputValue ? {optionsForCategory} : "Категория не найдена"}
                    onBlur={e => blurHandler(e)}
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
                {(logoDirty && logoError) && <div style={{color:"red", paddingBottom:7}}>{logoError}</div>}
                <Form.Control
                    name="logo"
                    type="file"
                    className="rounded-0"
                    onChange={e => logoHandler(e)}
                    accept="image/*,.png,.jpg,.gif,.web,.svg"
                    onBlur={e => blurHandler(e)}
                />
            </Form.Group>
            <Form.Group controlId="appImages" className="mb-3">
                <Form.Label>Изображения приложения</Form.Label>
                {(imagesDirty && imagesError) && <div style={{color:"red", paddingBottom:7}}>{imagesError}</div>}
                <Form.Control
                    name="images"
                    type="file"
                    className="rounded-0"
                    multiple
                    accept="image/*,.png,.jpg,.gif,.web,.svg"
                    onChange={e => imagesHandler(e)}
                    onBlur={e => blurHandler(e)}
                />
            </Form.Group>
            <Form.Group controlId="appInstaller" className="mb-3">
                <Form.Label>Добавьте свое приложение</Form.Label>
                {(installerDirty && installerError) && <div style={{color:"red", paddingBottom:7}}>{installerError}</div>}
                <Form.Control
                    name="installer"
                    type="file"
                    className="rounded-0"
                    accept=".exe,.deb,.tar.gz,.apk,.ipa"
                    onChange={e => installerHandler(e)}
                    onBlur={e => blurHandler(e)}
                />
            </Form.Group>
            <div className="d-flex justify-content-end w-100">
                <Button
                    className="btn-primary rounded-0 ps-4 pe-4"
                    variant="success"
                    onClick={handleClick}
                >Добавить</Button>
            </div>
        </Form>
    );
};

export default CreateAppForm;