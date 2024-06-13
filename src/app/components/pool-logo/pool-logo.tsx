import "./pool-logo.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { PoolLogoComponent } from "./pool-logo-types";

const PoolLogo: PoolLogoComponent = () => {
    return (
        <div className="pool-logo">
            <FontAwesomeIcon className="logo-icon" icon={faSpotify}></FontAwesomeIcon>
            <span className="logo-text">Song-Pool</span>
        </div>
    );
};

export default PoolLogo;
