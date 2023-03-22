import React from 'react';
import {ListGroup} from "react-bootstrap";
import './SideBar.style.css';
import {observer} from "mobx-react-lite";

const SideBar = observer(({setItemId}) => {
    const listItems = [
        {id: 1, name: 'Мои приложения'},
        {id: 2, name: 'Статистика'},
        {id: 3, name: 'Добавить новое приложение'}
    ]

    return (
        <ListGroup className="w-25 list-group">
            {listItems.map(item =>
                <ListGroup.Item
                    className={'list-group-item'}
                    onClick={() => {setItemId(item.id);}}
                    key={item.id}
                    action
                >{item.name}</ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default SideBar;