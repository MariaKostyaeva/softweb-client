import React from 'react';
import {Button, Form, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";

const EditUserPassword = ({active,editFormData,handleEditFormChange,onEdit,onClose}) => {
    if(!active){
        return null;
    }
    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <ModalDialog onClick={(e) => e.stopPropagation()}>
                <ModalHeader closeButton onClick={onClose}>
                    <ModalTitle>Смена пароля</ModalTitle>
                </ModalHeader>

                <ModalBody style={{height: 300, overflowY: "auto"}}>
                    <Form className="w-100 mb-4">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Текущий пароль</Form.Label>
                            <Form.Control
                                name="password"
                                autoComplete="off"
                                className="rounded-0"
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
                                placeholder="Введите пароль еще раз"
                                value={editFormData.confirmPassword}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-center w-100">
                        <Button
                            className="btn-primary rounded-0 ps-4 pe-4"
                            variant="success"
                            onClick={onEdit}
                        >Сохранить</Button>
                    </div>
                </ModalFooter>
            </ModalDialog>
        </div>
    );
};

export default EditUserPassword;