"use client";

import { UserLoginComponent } from "./user-login-types";
import "./user-login.scss";

import { useState } from "react";

import DummyUser from "./dummy-user/dummy-user";
import axios from "axios";

const UserLogin: UserLoginComponent = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function openWindow(spotifyAuthUrl: string): Window {
        const windowWidth = 600;
        const windowHeight = 900;
        const left = (window.screen.width - windowWidth) / 2;
        const top = (window.screen.height - windowHeight) / 2;
        const windowOptions = `width=${windowWidth},height=${windowHeight},left=${left},top=${top},scrollbars=no,resizable=no`;
        return window.open(spotifyAuthUrl, "Spotify User Login", windowOptions)!;
    }

    async function handleUserLoginClick() {
        setIsLoading(true);
        let spotifyAuthUrl: string;
        try {
            const response = await axios.get("http://localhost:3030/api/spotify/login");
            console.log(response);
            spotifyAuthUrl = response.data.spotifyAuthUrl;
        } catch (error) {
            console.error("Failed to fetch Spotify Auth URL:", error);
            return;
        }
        const loginWindow = openWindow(spotifyAuthUrl);
        // if (authWindow) {
        //     // Call get on http://localhost:3030/api/spotify/token?tokenType=access
        //     let spotifyAuthToken = await axios
        //         .get("http://localhost:3030/api/spotify/token?tokenType=access")
        //         .then((response) => response.data.accessToken);
        //     if (spotifyAuthToken) {
        //         authWindow.close();
        //     }
        // }
    }

    return (
        <div className="user-profile-component" onClick={handleUserLoginClick}>
            {isUserLoggedIn ? <div>User Is Logged In!</div> : <DummyUser></DummyUser>}
        </div>
    );
};

export default UserLogin;
