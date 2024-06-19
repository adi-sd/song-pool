import { objectToQueryString, QueryParamsObject } from "@/app/utils/api-utils";
import axios from "axios";
import NextAuth, { NextAuthConfig } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const BASE_PATH = "/api/spotify";

function getSpotifyAuthUrl() {
    const params: QueryParamsObject = {
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        response_type: "code",
        scope: process.env.SPOTIFY_AUTH_SCOPE!,
        redirect_uri: process.env.REDIRECT_URI!,
        show_dialog: true,
    };
    return process.env.SPOTIFY_USER_AUTH_URL + "?" + objectToQueryString(params);
}

export const serverAuthConfig: NextAuthConfig = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: getSpotifyAuthUrl(),
        }),
    ],
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET as string,
};

export const { handlers, auth, signIn, signOut } = NextAuth(serverAuthConfig);
