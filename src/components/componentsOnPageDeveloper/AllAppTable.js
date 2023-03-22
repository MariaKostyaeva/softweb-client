import React from 'react';
import {Button, Table} from "react-bootstrap";

const AllAppTable = () => {
    return (
        <div className="mb-4 w-100 overflow-hidden">
            <h5>Мои приложения</h5>
            <hr/>
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
                <tr>
                    <td>1</td>
                    <td>Krita</td>
                    <td>GPL-3.0</td>
                    <td>12 апреля 2022</td>
                    <td>1205</td>
                    <td>430</td>
                    <td><Button className="btn-secondary rounded-0" style={{borderWidth:1,borderColor:"#262626",borderStyle:"solid"}}>Редактировать</Button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Sublime-text</td>
                    <td>LR-4.1</td>
                    <td>06 мая 2022</td>
                    <td>100</td>
                    <td>39</td>
                    <td><Button className="btn-secondary rounded-0" style={{borderWidth:1,borderColor:"#262626",borderStyle:"solid"}}>Редактировать</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Otcom</td>
                    <td>LRS-1.1.0</td>
                    <td>03 сентября 2022</td>
                    <td>1425</td>
                    <td>40</td>
                    <td><Button className="btn-secondary rounded-0" style={{borderWidth:1,borderColor:"#262626",borderStyle:"solid"}}>Редактировать</Button></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Veribet</td>
                    <td>Sols-3943</td>
                    <td>06 мая 2022</td>
                    <td>1000</td>
                    <td>309</td>
                    <td><Button className="btn-secondary rounded-0" style={{borderWidth:1,borderColor:"#262626",borderStyle:"solid"}}>Редактировать</Button></td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default AllAppTable;