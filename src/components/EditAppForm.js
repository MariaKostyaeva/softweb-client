import React, {useEffect, useState} from 'react';
import {Button, Form, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import Select from "react-select";
import {$authHost} from "../http";
import {values} from "mobx";
import {selectOptions} from "@testing-library/user-event/dist/select-options";

const EditAppForm = ({active, editFormData, handleEditFormChange, onEdit, onClose}) => {
    if(!active){
        return null;
    }
    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <ModalDialog onClick={(e) => e.stopPropagation()}>
                <ModalHeader closeButton onClick={onClose}>
                    <ModalTitle>Редактирование приложения</ModalTitle>
                </ModalHeader>

                <ModalBody style={{height: 550, overflowY: "auto"}}>
                    <Form className="w-100 mb-4">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="appName">Наименование приложения</Form.Label>
                            <Form.Control
                                name="name"
                                className="rounded-0"
                                id="appName"
                                autoComplete="off"
                                placeholder="Введите наименование приложения"
                                value={editFormData.name}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="appLicense">Лицензия</Form.Label>
                            <Select
                                name="license"
                                options={editFormData.optionsForLicense}
                                noOptionsMessage={({inputValue}) => !inputValue ? editFormData.optionsForLicense : "Лицензия не найдена"}
                                defaultInputValue={editFormData.license}
                                onChange={handleEditFormChange}
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
                                name="shortDescription"
                                autoComplete="off"
                                className="rounded-0"
                                id="appShortDescription"
                                placeholder="Опишите меня в двух словах"
                                value={editFormData.shortDescription}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="appVersion">Укажите версию приложения</Form.Label>
                            <Form.Control
                                name="version"
                                autoComplete="off"
                                className="rounded-0"
                                id="appVersion"
                                placeholder="Тут должна быть версия"
                                value={editFormData.version}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="appLongDescription">Полное описание</Form.Label>
                            <Form.Control
                                name="longDescription"
                                as="textarea"
                                className="rounded-0"
                                id="appLongDescription"
                                placeholder="Расскажите обо мне ;)"
                                value={editFormData.longDescription}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="appCategory">Категория приложения</Form.Label>
                            <Select
                                name="category"
                                options={editFormData.optionsForCategory}
                                noOptionsMessage={({inputValue}) => !inputValue ? editFormData.optionsForCategory : "Категория не найдена"}
                                defaultInputValue={editFormData.category}
                                onChange={handleEditFormChange}
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
                                name="logo"
                                type="file"
                                className="rounded-0"
                                value={editFormData.logo}
                                onChange={handleEditFormChange}
                                // onChange={e => setLogo(e.target.files[0])}
                                accept="image/*,.png,.jpg,.gif,.web,.svg"
                            />
                        </Form.Group>
                        <Form.Group controlId="appImages" className="mb-3">
                            <Form.Label>Изображения приложения</Form.Label>
                            <Form.Control
                                name="images"
                                type="file"
                                className="rounded-0"
                                multiple
                                accept="image/*,.png,.jpg,.gif,.web,.svg"
                                value={editFormData.images}
                                onChange={handleEditFormChange}
                                // onChange={e => setImages(e.target.files)}
                            />
                        </Form.Group>
                        <Form.Group controlId="appInstaller" className="mb-3">
                            <Form.Label>Добавьте свое приложение</Form.Label>
                            <Form.Control
                                name="installer"
                                type="file"
                                className="rounded-0"
                                accept=".exe,.deb,.tar.gz,.apk,.ipa"
                                value={editFormData.installer}
                                onChange={handleEditFormChange}
                                // onChange={e => setInstaller(e.target.files[0])}
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

export default EditAppForm;