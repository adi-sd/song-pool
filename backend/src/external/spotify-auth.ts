import dotenv from "dotenv";
dotenv.config();
import { Logger } from "../utils/logger/logger.js";
import { FetchCallResponse } from "../types/errors.js";
import { FetchCall } from "../utils/fetch-call.js";

export class SpotifyAuth {
    private static songMarket: string = process.env.SONG_MARKET!;
    private static songRecommendations: string = process.env.SONG_RECOMMENDATIONS!;

    public static async getAccessToken(): Promise<string> {
        Logger.info("Getting Spotify Auth Token");
        try {
            const tokenUrl: string = process.env.SPOTIFY_TOKEN_URL!;
            const spotifyAuth: string = process.env.SPOTIFY_CLIENT_AUTH!;
            let params = {
                grant_type: "client_credentials",
            };
            let headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${spotifyAuth}`,
            };
            let fetchCallResponse = (await FetchCall.httpCall("POST", tokenUrl, params, headers)) as FetchCallResponse;
            Logger.debug(`Got Response - ${fetchCallResponse.getJSONString()}`);
            if (fetchCallResponse.isSuccessResponse) {
                return fetchCallResponse.httpResponse.access_token;
            } else {
                throw new Error(JSON.stringify(fetchCallResponse));
            }
        } catch (error) {
            Logger.error("Exception while getting Spotify access token", error);
            throw error;
        }
    }

    public static async getUserAuth(): Promise<string> {
        Logger.info("Getting User Authorization");
        try {
            const authUrl: string = process.env.SPOTIFY_USER_AUTH_URL!;
            const clientId: string = process.env.SPOTIFY_CLIENT_ID!;
            const redirectUrl: string = process.env.REDIRECT_URL!;
            const scope: string = process.env.SPOTIFY_AUTH_SCOPE!;
            let params = {
                client_id: clientId,
                response_type: "code",
                scope: scope,
                redirect_url: redirectUrl,
                show_dialog: true,
            };
            let fetchCallResponse = (await FetchCall.httpCall("GET", authUrl, params)) as FetchCallResponse;
            Logger.debug(`Got Response - ${fetchCallResponse.getJSONString()}`);
            if (fetchCallResponse.isSuccessResponse) {
                return fetchCallResponse.httpResponse;
            } else {
                throw new Error(JSON.stringify(fetchCallResponse));
            }
        } catch (error) {
            Logger.error("Exception while getting Spotify User Authorization", error);
            throw error;
        }
    }

    public static async testToken(): Promise<string> {
        return await SpotifyAuth.getAccessToken();
    }

    public static async testUserAuth(): Promise<string> {
        return await SpotifyAuth.getUserAuth();
    }
}
