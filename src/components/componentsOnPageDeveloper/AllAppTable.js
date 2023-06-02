import React, {useContext, useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";
import {$authHost} from "../../http";
import Loader from "../Loader/Loader";
import {Context} from "../../index";
import usePagination from "../../hooks/usePagination";
import axios from "axios";
import {Buffer} from "buffer";
import Modal from "../Modal.tsx";
import EditAppForm from "../EditAppForm";

const AllAppTable = () => {
    const {user} = useContext(Context);
    const [applications,setApplications] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);
    const [total,setTotal] = useState([]);
    const [removedItem,setRemovedItem] = useState(null);
    const [editedItem,setEditedItem] = useState(null);
    const [licenses,setLicenses] = useState([]);
    const [currentLicense,setCurrentLicense] = useState('');
    const [categories,setCategories] = useState([]);
    const [currentCategory,setCurrentCategory] = useState('');

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

    const userAuthData = JSON.parse(localStorage.getItem('authData'));
    const encodedCred = Buffer.from(userAuthData.username + ':' + userAuthData.password).toString('base64');
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Basic ${encodedCred}`
    };

    const [editFormData, setEditFormData] = useState({
        name: '',
        license: '',
        shortDescription: '',
        version: '',
        longDescription: '',
        category: '',
        logo: '',
        images: '',
        installer: ''
    });

    const fetchTotalAppByUserId = async () => {
        try{
            const response = await axios.get(`http://localhost:8072/store/v1/application/user/info?size=5&userId=${user._userId}`);
            setTotal(response.data);
        }
        catch (e){
            console.log(e);
        }
    }

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        totalPages,
    } = usePagination({contentPerPage: 5, count: total['total'],});

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.currentTarget.name;
        const fieldValue = e.currentTarget.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const deleteApp = async () => {
        if(removedItem){
            Array.from(removedItem.images).forEach(file => {
               axios.delete(`http://localhost:8072/store/v1/image/${file.id}`, {headers})
                    .then(() => {
                        console.log('Изображения успешно удалены!')
                    })
                    .catch(error => {
                        alert("Ошибка удаления!")
                        console.error('There was an error!', error);
                    });
            });
            Array.from(removedItem.installers).forEach(installer => {
                axios.delete(`http://localhost:8072/store/v1/installer/${installer.id}`, {headers})
                    .then(() => {
                        console.log('Установщики успешно удалены!')
                        deleteApplicationInfo();
                    })
                    .catch(error => {
                        alert("Ошибка удаления!")
                        console.error('There was an error!', error);
                    });
            })
        }
        setRemovedItem(null);
    }

    const deleteApplicationInfo = async () => {
        await axios.delete(`http://localhost:8072/store/v1/application/${removedItem.id}`, {headers})
            .then(() => {
                setApplications((applications) => applications.filter(item => item.id !== removedItem.id));
                alert("Приложение успешно удалено!");
            })
            .catch(error => {
                alert("Ошибка удаления!")
                console.error('There was an error!', error);
            });
    }

    const closeModal = () => {
        setRemovedItem(null);
        setEditedItem(null);
    }

    const handleEditClick = (e, app) => {
        e.preventDefault();
        setEditedItem(app);
        const formValues = {
            name: app.name,
            license: app.license.name,
            optionsForLicense: optionsForLicense,
            currentLicense: currentLicense ? optionsForLicense.find(l => l.label === currentLicense) : '',
            shortDescription: app.shortDescription,
            version: app.installers[0].version,
            longDescription: app.longDescription,
            category: app.category.name,
            optionsForCategory: optionsForCategory,
            logo: '',
            images: '',
            installer: ''
        }
        setEditFormData(formValues);
        console.log(formValues)
    }

    const fetchAppByUserId = async (id) => {
        try{
            setIsAppLoading(true);
            const response = await axios.get(`http://localhost:8072/store/v1/application/user?size=${total['total']}&sort=id,asc&userId=${id}`);
            setApplications(response.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    const formatDate = (newDate) => {
        const date = new Date(Date.UTC(newDate[0] , newDate[1] , newDate[2]));
        const longRuRUFormatter = new Intl.DateTimeFormat('ru-RU',{
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        return longRuRUFormatter.format(date);
    }

    const fetchData = async () => {
        try{
            const license = await axios.get(`http://localhost:8072/store/v1/license`);
            setLicenses(license.data);
            const category = await axios.get('http://localhost:8072/store/v1/category');
            setCategories(category.data);
        }
        catch (e){
            console.log(e.toString());
        }
    }

    useEffect(() => {
        fetchTotalAppByUserId();
        fetchAppByUserId(user._userId);
        fetchData();
    }, [])

    return (
        <div className="mb-4 w-100 overflow-hidden">
            <h5>Мои приложения</h5>
            <hr/>
            {isAppLoading
                ? <Loader/>
                :
                <div>
                    <Modal active={!!removedItem} app={removedItem} onClose={closeModal} onSubmit={deleteApp}/>
                    <EditAppForm
                        active={!!editedItem}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        onClose={closeModal}/>
                    {applications.length === 0
                        ? <h5 className="d-flex justify-content-center m-auto" style={{fontWeight:300}}>Список пуст. Добавьте свое первое приложение :)</h5>
                        : <div>
                            <Table striped className="mb-4" responsive>
                        <thead>
                        <tr>
                        <th>№</th>
                        <th>Наименование приложения</th>
                        <th>Лицензия</th>
                        <th>Последнее обновление</th>
                        <th>Количество просмотров</th>
                        <th>Количество скачиваний</th>
                        <th></th>
                        </tr>
                        </thead>
                        <tbody data-testid="app-list">
                    {applications.slice(firstContentIndex,lastContentIndex).map((app,index) =>
                        <tr key={app.id}>
                        <td>{index + 1}</td>
                        <td>{app.name}</td>
                        <td>{app.license.code}</td>
                        <td>{formatDate(app.lastUpdate)}</td>
                        <td>{app.views}</td>
                        <td>{app.downloads}</td>
                        <td><Button className="btn-secondary rounded-0" style={{
                        borderWidth: 1,
                        borderColor: "#262626",
                        borderStyle: "solid"
                    }}
                        onClick={(e) => handleEditClick(e, app)}
                        >Редактировать</Button></td>
                        <td><Button className="rounded-0 ps-4 pe-4" variant="outline-danger" onClick={() => setRemovedItem(app)}>Удалить</Button></td>
                        </tr>
                        )}
                        </tbody>
                        </Table>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                    {
                        lastContentIndex !== 5 && <div className="d-flex align-items-center justify-content-start w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={prevPage}><i className="fa fa-chevron-left m-2 ms-0"/>Предыдущая страница</button></div>
                    }
                    {
                        (page !== totalPages || lastContentIndex < 5 ) && <div className="d-flex align-items-center justify-content-end w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={nextPage}>Следующая страница<i className="fa fa-chevron-right m-2 me-0"/></button></div>
                    }
                        </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default AllAppTable;