import { FetchCall } from "../utils/fetch-call.js";
import { Logger } from "../utils/logger/logger.js";

export class ExternalApiCall {
    private static instance: ExternalApiCall | null = null;
    private static spotifyAccessToken: string | null = null;

    private constructor() {}

    static getInstance(): ExternalApiCall {
        if (!ExternalApiCall.instance) {
            ExternalApiCall.instance = new ExternalApiCall();
        }
        return ExternalApiCall.instance;
    }

    static async getAccessToken(): Promise<void> {
        if (!this.spotifyAccessToken) {
            // Fetch access token from the server (example)
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
                await FetchCall.httpCall("POST", tokenUrl, params, headers).then((responseJson) => {
                    Logger.debug(`Got Response - ${JSON.stringify(responseJson)}`);
                    this.spotifyAccessToken = responseJson.access_token;
                });
            } catch (error) {
                Logger.error("Error fetching access token:", error);
            }
        }
    }

    async testToken(): Promise<string> {
        await ExternalApiCall.getAccessToken();
        return ExternalApiCall.spotifyAccessToken || "None";
    }
}
