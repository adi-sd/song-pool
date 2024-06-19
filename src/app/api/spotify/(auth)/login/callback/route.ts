import { PoolApiHeaders } from "@/app/utils/constants";
import { SpotifyAuthResponse } from "@/app/utils/response-types";
import axios from "axios";

const handleAuthCallback = async (req: Request) => {
    const { searchParams } = new URL(req.url!);
    if (searchParams.has("error")) {
        return {
            success: false,
            message: searchParams.get("error")!,
        };
    }
    const code = searchParams.get("code");
    if (code) {
        const getAccessTokenResponse = await getAccessTokenWithCode(code);
        if (getAccessTokenResponse) {
            const postDbTokenResponse = await axios
                .post("http://localhost:3030/api/db/token", getAccessTokenResponse)
                .then((response) => response.data);
            console.debug(postDbTokenResponse);
            return {
                success: true,
                message: "Login Successful! You can Close the Window",
            };
        } else {
            return {
                success: false,
                message: "Error while getting the Access Token!",
            };
        }
    } else {
        return {
            success: false,
            message: "Error while getting the Auth Token; couldn't find the Auth Code in the response!",
        };
    }
};

const getAccessTokenWithCode = async (authCode: string): Promise<SpotifyAuthResponse> => {
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
        // console.debug(tokenResponse);
        return tokenResponse as SpotifyAuthResponse;
    } catch (error) {
        console.error("Error While Getting Spotify Auth Token With Code", error);
        throw error;
    }
};

// url = http://localhost:3030/api/spotify/login/callback
export const GET = async (req: Request) => {
    const getLoginCallbackResponse = await handleAuthCallback(req);
    return Response.json(getLoginCallbackResponse, PoolApiHeaders.POOL_API_SUCCESS);
};
