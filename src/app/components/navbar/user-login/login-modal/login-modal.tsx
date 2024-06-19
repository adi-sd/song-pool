import { LoginModalComponent } from "./login-modal-types";
import "./login-modal.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const LoginModal: LoginModalComponent = ({ handleShowModal, url }) => {
    async function getWebPage(url: string) {
        // let response = await axios.get(url);
    }

    return (
        <div className="login-modal-component-wrapper" onClick={handleShowModal}>
            <div className="login-modal-component" onClick={(e) => e.stopPropagation()}>
                <div className="close-button" onClick={handleShowModal}>
                    <FontAwesomeIcon className="user-icon" icon={faXmark}></FontAwesomeIcon>
                </div>
                <div className="url-window">{}</div>
            </div>
        </div>
    );
};

export default LoginModal;
