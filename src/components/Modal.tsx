import {Button, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import {PropsWithChildren} from "react";
interface IModalProps {
    active: boolean;
    app: any;
    onSubmit: () => void;
    onClose: () => void;
}

const Modal = ({active, app, onClose, onSubmit}: PropsWithChildren<IModalProps>) => {
    if(!active){
        return null;
    }
    return (
        <div className="modal" style={{ display: 'block', position: 'absolute' }}>
            <ModalDialog onClick={(e) => e.stopPropagation()}>
                <ModalHeader closeButton onClick={onClose}>
                    <ModalTitle>Удаление приложения</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <p>Вы действительно хотите удалить {app.name}?</p>
                </ModalBody>

                <ModalFooter>
                    <div className="d-flex justify-content-between w-100">
                        <Button className="rounded-0" style={{width:100}} variant="secondary" onClick={onClose}>Отменить</Button>
                        <Button className="rounded-0" style={{width:100}} variant="outline-danger" onClick={onSubmit}>Удалить</Button>
                    </div>
                </ModalFooter>
            </ModalDialog>
        </div>
    );
};

export default Modal;