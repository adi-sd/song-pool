import { objectToQueryString, QueryParamsObject } from "@/app/utils/api-utils";
import { PoolApiHeaders } from "@/app/utils/constants";

import { NextApiHandler } from "next";

// url =  http://localhost:3030/api/spotify/login
const GET: NextApiHandler = () => {
    const params: QueryParamsObject = {
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        response_type: "code",
        scope: process.env.SPOTIFY_AUTH_SCOPE!,
        redirect_uri: process.env.REDIRECT_URI!,
        show_dialog: true,
    };
    const authUrl = process.env.SPOTIFY_USER_AUTH_URL + "?" + objectToQueryString(params);
    const getLoginResponse = {
        spotifyAuthUrl: authUrl,
    };
    return Response.json(getLoginResponse, PoolApiHeaders.POOL_API_SUCCESS);
};

export { GET };
