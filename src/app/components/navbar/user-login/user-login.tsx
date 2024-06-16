"use client";

import { UserLoginComponent } from "./user-login-types";
import "./user-login.scss";

import { useState } from "react";

import DummyUser from "./dummy-user/dummy-user";

const UserLogin: UserLoginComponent = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function handleUserLoginClick() {
        setIsLoading(true);
        const response = await fetch("http://localhost:3030/api/spotify/login", {
            method: "GET",
        });
        const { spotifyAuthUrl } = await response.json();
        const windowWidth = 600;
        const windowHeight = 900;
        const left = (window.screen.width - windowWidth) / 2;
        const top = (window.screen.height - windowHeight) / 2;
        const windowOptions = `width=${windowWidth},height=${windowHeight},left=${left},top=${top},scrollbars=no,resizable=no`;
        const authWindow = window.open(spotifyAuthUrl, "Spotify User Login", windowOptions)!;
        if (authWindow?.location.href != spotifyAuthUrl) {
            const response = authWindow.document.body.getElementsByTagName("pre")[0].innerText;
            const spotifyAuthSuccess = JSON.parse(response).spotifyAuthSuccess;
            if (spotifyAuthSuccess) {
                setIsUserLoggedIn(true);
                setIsLoading(false);
                authWindow.close();
            }
        }
    }

    return (
        <div className="user-profile-component" onClick={handleUserLoginClick}>
            {isUserLoggedIn ? <div>User Is Logged In!</div> : <DummyUser></DummyUser>}
        </div>
    );
};

export default UserLogin;
