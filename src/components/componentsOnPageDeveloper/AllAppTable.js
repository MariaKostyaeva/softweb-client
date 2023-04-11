import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Table} from "react-bootstrap";
import {$authHost} from "../../http";
import Loader from "../Loader/Loader";
import {Context} from "../../index";
import usePagination from "../../hooks/usePagination";
import axios from "axios";

const AllAppTable = () => {
    const {user} = useContext(Context);
    const [applications,setApplications] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);
    const [total,setTotal] = useState([]);

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        totalPages,
    } = usePagination({contentPerPage: 5, count: total['total'],});

    const fetchTotalAppByUserId = async () => {
        try{
            const response = await $authHost.get(`store/v1/application/user/info?size=5&userId=${user._userId}`);
            setTotal(response.data);
        }
        catch (e){
            console.log(e);
        }
    }

    const fetchAppByUserId = async () => {
        try{
            setIsAppLoading(true);
            const response = await $authHost.get(`store/v1/application/user?size=${total['total']}&sort=id,asc&userId=${user._userId}`);
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

    const deleteApp = (id) => {
        axios.delete(`http://localhost:8072/store/v1/application/${id}`)
            .then(() => {
                setApplications(applications.filter(el => el.id !== id));
                return <Alert>Приложение успешно удалено!</Alert>
            })
            .catch((e) => console.log(e.toString()))
    }


    useEffect(() => {
        fetchTotalAppByUserId();
        fetchAppByUserId();
    }, [])

    return (
        <div className="mb-4 w-100 overflow-hidden">
            <h5>Мои приложения</h5>
            <hr/>
            {isAppLoading
                ? <Loader/>
                :
                <div>
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
                        <tbody>
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
                                }}>Редактировать</Button></td>
                                <td><Button className="rounded-0 ps-4 pe-4" variant="outline-danger" onClick={() => deleteApp(app.id)}>Удалить</Button></td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                        {
                            lastContentIndex !== 5 && <div className="d-flex align-items-center justify-content-start w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={prevPage}><i className="fa fa-chevron-left m-2 ms-0"/>Предыдущая страница</button></div>
                        }
                        {
                            page !== totalPages && <div className="d-flex align-items-center justify-content-end w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={nextPage}>Следующая страница<i className="fa fa-chevron-right m-2 me-0"/></button></div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default AllAppTable;