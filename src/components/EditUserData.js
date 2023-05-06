import React from 'react';
import {Button, Form, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";

const EditUserData = ({active, editFormData, handleEditFormChange, onEdit, onDelete, onClose}) => {
    if(!active){
        return null;
    }
    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <ModalDialog onClick={(e) => e.stopPropagation()}>
                <ModalHeader closeButton onClick={onClose}>
                    <ModalTitle>Внесение изменений в учетную запись</ModalTitle>
                </ModalHeader>

                <ModalBody style={{height: 470, overflowY: "auto"}}>
                    <Form className="w-100 mb-4">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="fullName">Имя пользователя</Form.Label>
                            <Form.Control
                                name="fullName"
                                className="rounded-0"
                                id="fullName"
                                autoComplete="off"
                                placeholder="Введите имя и фамилию"
                                value={editFormData.fullName}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">Логин</Form.Label>
                            <Form.Control
                                name="username"
                                autoComplete="off"
                                className="rounded-0"
                                id="username"
                                placeholder="Введите логин"
                                value={editFormData.username}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Текущий пароль</Form.Label>
                            <Form.Control
                                name="password"
                                autoComplete="off"
                                className="rounded-0"
                                id="password"
                                type="password"
                                placeholder="Пароль"
                                value={editFormData.password}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="newPassword">Выберите пароль</Form.Label>
                            <Form.Control
                                name="newPassword"
                                autoComplete="off"
                                className="rounded-0"
                                id="newPassword"
                                type="password"
                                placeholder="Пароль должен содержать от 3 до 16 символов"
                                value={editFormData.newPassword}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="confirmPassword">Повторно введите пароль</Form.Label>
                            <Form.Control
                                name="confirmPassword"
                                type="password"
                                className="rounded-0"
                                id="confirmPassword"
                                placeholder="Введите пароль еще раз"
                                value={editFormData.confirmPassword}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-between w-100">
                        <Button className="rounded-0 btn" variant="outline-danger" onClick={onDelete}>Удалить учетную запись</Button>
                        <Button
                            className="btn-primary rounded-0 ps-4 pe-4"
                            variant="success"
                            onClick={onEdit}
                        >Сохранить изменения</Button>
                    </div>
                </ModalFooter>
            </ModalDialog>
        </div>
    );
};

export default EditUserData;