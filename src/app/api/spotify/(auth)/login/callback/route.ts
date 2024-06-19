import { PoolApiHeaders } from "@/app/utils/constants";
import { SpotifyAuthResponse } from "@/app/utils/response-types";
import axios from "axios";
import { NextRequest } from "next";

const handleAuthCallback = (req: NextRequest) => {

    if (req.searchParams.has("error")) {
        return {
            success: false,
            message: req.searchParams.get("error")!,
        };
    }
    console.log(req);
    if (code) {
        getAccessTokenWithCode(code).then(async (tokenResponse) => {
            // Call post on http://localhost:3030/api/db/token
            const postResponse = await axios
                .post("http://localhost:3030/api/db/token", tokenResponse)
                .then((response) => response.data);
            console.debug(postResponse);
        });
        return {
            success: true,
            message: "Login Successful! You can Close the Window",
        };
    } else {
        return {
            success: false,
            message: "Error while getting the Auth Token; couldn't find the Auth Code in the response!",
        };
    }
};

async function getAccessTokenWithCode(authCode: string): Promise<SpotifyAuthResponse> {
    try {
        let params = {
            code: authCode,
            redirect_uri: process.env.REDIRECT_URI!,
            grant_type: "authorization_code",
            json: "true",
        };
        let headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${process.env.SPOTIFY_CLIENT_AUTH!}`,
        };
        const tokenResponse = await axios
            .post(process.env.SPOTIFY_TOKEN_URL!, new URLSearchParams(params).toString(), {
                headers: headers,
            })
            .then((response) => response.data);
        console.debug(tokenResponse);
        return tokenResponse as SpotifyAuthResponse;
    } catch (error) {
        console.error("Error While Getting Spotify Auth Token With Code", error);
        throw error;
    }
}

// url = http://localhost:3030/api/spotify/login/callback
const GET = (req: NextRequest) => {
    const getLoginCallbackResponse = handleAuthCallback(req);
    return Response.json(getLoginCallbackResponse, PoolApiHeaders.POOL_API_SUCCESS);
};

export { GET };
