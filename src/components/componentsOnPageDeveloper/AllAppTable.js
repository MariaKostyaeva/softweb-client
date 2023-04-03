import React, {useEffect, useMemo, useState} from 'react';
import {Button, Pagination, Table} from "react-bootstrap";
import {$authHost, $host} from "../../http";
import Loader from "../Loader/Loader";
import '../../assets/Pagination.style.css'

const AllAppTable = () => {
    const [applications,setApplications] = useState([]);
    const [isAppLoading,setIsAppLoading] = useState(false);
    const [userId,setUserId] = useState();
    const [currentPage,setCurrentPage] = useState(0);
    const [appPerPage] = useState(5);

    const lastAppIndex = currentPage * appPerPage;
    const firstAppIndex = lastAppIndex - appPerPage;
    const currentApp = applications.slice(firstAppIndex,lastAppIndex);
    const totalPage = Math.ceil(applications.length/appPerPage);

    const getUserId = () => {
        if(localStorage.length !== 0){
            const id = JSON.parse(localStorage.getItem('user'));
            setUserId(id['id']);
        }
    }

    async function fetchAppByUserId(){
        try{
            setIsAppLoading(true);
            const response = await $authHost.get(`store/v1/application/user?page=0&1&sort=id,asc&userId=${userId}`);
            setApplications(response.data);
            setIsAppLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }

    const showPrevPage = () => {
        setCurrentPage(prev => prev - 1);
    }

    const showNextPage = () => {
        setCurrentPage(prev => prev + 1);
    }


    function formatDate(newDate) {
        const date = new Date(Date.UTC(newDate[0] , newDate[1] , newDate[2]));
        const longRuRUFormatter = new Intl.DateTimeFormat('ru-RU',{
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        return longRuRUFormatter.format(date);
    }

    useEffect(() => {
        getUserId();
        fetchAppByUserId();
    }, [])

    return (
        <div className="mb-4 w-100 overflow-hidden">
            <h5>Мои приложения</h5>
            <hr/>
            {isAppLoading
                ? <Loader/>
                :
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
                        {currentApp.map((app,index) =>
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
                            </tr>
                        )}
                    </tbody>
                </Table>
            }
            <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                {
                    currentApp !== 0 && <div className="d-flex align-items-center justify-content-start w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={() => showPrevPage()}><i className="fa fa-chevron-left m-2 ms-0"/>Предыдущая страница</button></div>
                }
                {
                    currentPage !== totalPage && <div className="d-flex align-items-center justify-content-end w-100"><button type="button" className="btn btn-secondary rounded-0" onClick={() => showNextPage()}>Следующая страница<i className="fa fa-chevron-right m-2 me-0"/></button></div>
                }
            </div>
        </div>
    );
};

export default AllAppTable;