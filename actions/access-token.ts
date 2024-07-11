import { type JWT } from "next-auth/jwt";

export const getSpotifyAccessToken = async (code: string): Promise<string | null> => {
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic NWM0NzI3MzU0N2QxNDU0MjljY2ZmYzQ2M2VjZWQ4MGM6NTIyYWRiYzMxMTJhNDE4ODhiN2M3YzhkNDQ0OWY0NWM=`,
            }),
            body: new URLSearchParams({
                client_id: "5c47273547d145429ccffc463eced80c",
                grant_type: "authorization_code",
                code: code,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data["access_token"];
        } else {
            console.error("Could not get spotify access token!");
            return null;
        }
    } catch (error) {
        console.error((error as Error).message);
        throw error;
    }
};

export const refreshToken = async (token: JWT) => {
    try {
        const url = process.env.SPOTIFY_REFRESH_TOKEN_URL!;
        const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refresh_token!,
                client_id: process.env.SPOTIFY_CLIENT_ID!,
            }),
        };
        const response = await fetch(url, payload);
        if (!response.ok) {
            throw response;
        }
        const body = await response.json();
        return body;
    } catch (error) {
        // The error property can be used client-side to handle the refresh token error
        console.error("Error refreshing access token", error);
        throw error;
    }
};
