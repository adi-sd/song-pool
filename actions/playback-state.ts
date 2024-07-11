"use server";

import { auth } from "@/auth/auth";

const getSessionToken = async () => {
    const session = await auth();
    if (session) {
        const authToken = session.token;
        return authToken;
    } else {
        throw new Error("Unauthorized Spotify Access");
    }
};

export const getPlayBackState = async (): Promise<{ data?: any; error?: string }> => {
    const urlString: string = "https://api.spotify.com/v1/me/player?market=IN";
    try {
        const authToken = await getSessionToken();
        // console.debug("JWT Token:", authToken);
        const response = await fetch(urlString, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${authToken}`,
            }),
        });
        if (response.ok) {
            if (response.statusText === "OK") {
                const data = await response.json();
                console.debug(data);
                return { data: data };
            } else {
                console.error("No Content", response.statusText);
                return { error: response.statusText };
            }
        } else {
            console.error("Something went wrong", response.statusText);
            return { error: response.statusText };
        }
    } catch (error) {
        console.error("Error while getPlayBackState", error);
        throw error;
    }
};

export const pauseOrResumePlayback = async (wantToPause: boolean, deviceId?: string) => {
    let urlString = "";
    let messageString = "";
    if (wantToPause) {
        urlString = "https://api.spotify.com/v1/me/player/pause";
        messageString = "Pause Playback";
    } else {
        urlString = "https://api.spotify.com/v1/me/player/play";
        messageString = "Resume Playback";
    }
    try {
        const authToken = await getSessionToken();
        // console.debug("JWT Token:", authToken);
        let bodyParams = new URLSearchParams();
        if (deviceId) {
            bodyParams.set("device_id", deviceId);
        }
        const response = await fetch(urlString, {
            method: "PUT",
            headers: new Headers({
                Authorization: `Bearer ${authToken}`,
            }),
            body: bodyParams,
        });
        if (response.ok) {
            if (response.statusText === "OK") {
                return;
            } else {
                console.error(`Couldn't ${messageString}!`, response.statusText);
                return { error: response.statusText };
            }
        } else {
            console.error("Something went wrong", response.statusText);
            return { error: response.statusText };
        }
    } catch (error) {
        console.error(`Error while ${messageString}`, error);
        throw error;
    }
};

export const playNextOrPrevious = async (skipToNext: boolean, deviceId?: string) => {
    let urlString = "";
    let messageString = "";
    if (skipToNext) {
        urlString = "https://api.spotify.com/v1/me/player/next";
        messageString = "Skip to Next";
    } else {
        urlString = "https://api.spotify.com/v1/me/player/previous";
        messageString = "Skip to Previous";
    }
    try {
        const authToken = await getSessionToken();
        // console.debug("JWT Token:", authToken);
        let bodyParams = new URLSearchParams();
        if (deviceId) {
            console.log(deviceId);
            bodyParams.set("device_id", deviceId);
        }
        const response = await fetch(urlString, {
            method: "PUT",
            headers: new Headers({
                Authorization: `Bearer ${authToken}`,
            }),
            body: bodyParams,
        });
        if (response.ok) {
            if (response.statusText === "OK") {
                return;
            } else {
                console.error(`Couldn't ${messageString}!`, response.statusText);
                return { error: response.statusText };
            }
        } else {
            console.error("Something went wrong", response.statusText);
            return { error: response.statusText };
        }
    } catch (error) {
        console.error(`Error while ${messageString}`, error);
        throw error;
    }
};
