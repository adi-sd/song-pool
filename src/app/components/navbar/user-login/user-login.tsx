"use client";

import { UserLoginComponent } from "./user-login-types";
import "./user-login.scss";

import { use, useEffect, useState } from "react";

import DummyUser from "./dummy-user/dummy-user";
import axios from "axios";
import LoginModal from "./login-modal/login-modal";

const UserLogin: UserLoginComponent = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    async function handleUserLoginClick() {
        handleShowModal();
        // let spotifyAuthUrl: string;
        // try {
        //     const response = await axios.get("http://localhost:3030/api/spotify/login");
        //     spotifyAuthUrl = response.data.spotifyAuthUrl;
        //     // console.log(spotifyAuthUrl);
        // } catch (error) {
        //     console.error("Failed to fetch Spotify Auth URL:", error);
        //     return;
        // }
        // const loginWindow = openWindow(spotifyAuthUrl);
    }

    function handleShowModal() {
        setShowModal(!showModal);
    }

    return (
        <div className="user-profile-component" onClick={handleUserLoginClick}>
            {isUserLoggedIn ? <div>User Is Logged In!</div> : <DummyUser></DummyUser>}
            {showModal ? (
                <LoginModal title="Login to Spotify" description="askjdgi" isOpen onChange={() => {}}>
                    Test Children
                </LoginModal>
            ) : null}
        </div>
    );
};

export default UserLogin;
