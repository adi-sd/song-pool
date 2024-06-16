import { objectToQueryString, QueryParamsObject } from "@/app/utils/api-utils";
import { NextResponse } from "next/server";

export const GET = () => {
    const params: QueryParamsObject = {
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        response_type: "code",
        scope: process.env.SPOTIFY_AUTH_SCOPE!,
        redirect_uri: process.env.REDIRECT_URI!,
        show_dialog: true,
    };
    const authUrl = process.env.SPOTIFY_USER_AUTH_URL + "?" + objectToQueryString(params);
    return NextResponse.json({
        spotifyAuthUrl: authUrl,
    });
};
