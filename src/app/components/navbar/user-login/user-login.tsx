import { UserLoginComponent } from "./user-login-types";
import "./user-login.scss";

import DummyUser from "./dummy-user/dummy-user";

const UserLogin: UserLoginComponent = ({ isUserLoggedIn }) => {
    return (
        <div className="user-profile-component">
            {isUserLoggedIn ? <div>User Is Logged In!</div> : <DummyUser></DummyUser>}
        </div>
    );
};

export default UserLogin;
