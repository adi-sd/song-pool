import "./navbar.scss";

import UserProfile from "./user-login/user-login";
import PoolLogo from "../pool-logo/pool-logo";

function Navbar() {
    return (
        <div className="navbar-component">
            <div className="app-logo">
                <PoolLogo></PoolLogo>
            </div>
            <div className="user-profile">
                <UserProfile isUserLoggedIn={false}></UserProfile>
            </div>
        </div>
    );
}

export default Navbar;
