import { LoginModalComponent } from "./login-modal-types";
import "./login-modal.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import * as Dialog from "@radix-ui/react-dialog";

const LoginModal: LoginModalComponent = ({ children, description, isOpen, onChange, title }) => {
    async function getWebPage(url: string) {
        let response = await axios.get(url);
    }

    return (
        // <div className="login-modal-component-wrapper" onClick={handleShowModal}>
        //     <div className="login-modal-component" onClick={(e) => e.stopPropagation()}>
        //         <div className="close-button" onClick={handleShowModal}>
        //             <FontAwesomeIcon className="user-icon" icon={faXmark}></FontAwesomeIcon>
        //         </div>
        //         <div className="url-window">{}</div>
        //     </div>
        // </div>

        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="login-modal-overlay" />
                <Dialog.Content className="login-modal-content">
                    <div className="login-modal-header">
                        <h1 className="login-modal-title">{title}</h1>
                        <button className="login-modal-close-button" onClick={() => onChange(false)}>
                            <FontAwesomeIcon className="login-modal-close-icon" icon={faXmark}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div className="login-modal-description">{description}</div>
                    <div className="login-modal-body">{children}</div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default LoginModal;
