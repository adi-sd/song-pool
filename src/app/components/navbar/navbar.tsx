import "./navbar.scss";

import UserLogin from "./user-login/user-login";
import PoolLogo from "../pool-logo/pool-logo";

function Navbar() {
    return (
        <div className="navbar-component">
            <div className="app-logo">
                <PoolLogo></PoolLogo>
            </div>
            <div className="user-profile clickable-element">
                <UserLogin></UserLogin>
            </div>
        </div>
    );
}

export default Navbar;
