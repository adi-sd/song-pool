import { DummyUserComponent } from "./dummy-user-types";
import "./dummy-user.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

const DummyUser: DummyUserComponent = () => {
    return (
        <div className="dummy-user-component">
            <span className="user-text">Login to Spotify</span>
            <FontAwesomeIcon className="user-icon" icon={faCircleUser}></FontAwesomeIcon>
        </div>
    );
};

export default DummyUser;
