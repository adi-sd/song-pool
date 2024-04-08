import { SpotifyTrackRecommendations } from "../types/spotify-recommendations.js";
import { SpotifyTrack } from "../types/spotify-track.js";
import { FetchCall } from "../utils/fetch-call.js";
import { Logger } from "../utils/logger/logger.js";
import { ExternalApiCallError, FetchCallResponse } from "../types/errors.js";

export class ExternalApiCall {
    private static spotifyAuthHeader: string = process.env.SPOTIFY_AUTH_HEADER!;

    private static async getAccessToken(): Promise<string> {
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

    public static async textToken(): Promise<string> {
        return await ExternalApiCall.getAccessToken();
    }

    // Spotify Track Recommendations API
    public static async getRecommendedTracks(seedTrackId: string): Promise<SpotifyTrackRecommendations> {
        Logger.info("Getting Recommended Tracks");
        let recommendedTracks: SpotifyTrackRecommendations;
        const apiUrl: string = process.env.SPOTIFY_TRACK_RECOMMENDATION_URL!;
        const accessToken: string = await ExternalApiCall.getAccessToken()!;
        const songRecommendations: number = parseInt(process.env.SONG_RECOMMENDATIONS!);
        let params = {
            limit: `${songRecommendations}`,
            seed_tracks: `${seedTrackId}`,
            market: "US",
        };
        let headers = {
            "Content-Type": "application/json",
            Authorization: `${ExternalApiCall.spotifyAuthHeader} ${accessToken}`,
        };
        let fetchCallResponse = (await FetchCall.httpCall("GET", apiUrl, params, headers)) as FetchCallResponse;
        Logger.debug(`Got Response - ${fetchCallResponse.getJSONString()}`);
        if (fetchCallResponse.isSuccessResponse) {
            recommendedTracks = fetchCallResponse.httpResponse as unknown as SpotifyTrackRecommendations;
            return recommendedTracks;
        } else {
            throw new ExternalApiCallError("Exception while getting recommendations for the track", fetchCallResponse);
        }
    }

    // Spotify Track Info
    public static async getTrackInfo(trackId: string): Promise<SpotifyTrack> {
        Logger.info("Getting Track Information");
        let trackInfo: SpotifyTrack;
        const apiUrl: string = process.env.SPOTIFY_TRACK_INFO_URL! + `/${trackId}`;
        const accessToken: string = await ExternalApiCall.getAccessToken()!;
        let params = {
            market: "US",
        };
        let headers = {
            "Content-Type": "application/json",
            Authorization: `${ExternalApiCall.spotifyAuthHeader} ${accessToken}`,
        };
        let fetchCallResponse = (await FetchCall.httpCall("GET", apiUrl, params, headers)) as FetchCallResponse;
        Logger.debug(`Got Response - ${fetchCallResponse.getJSONString()}`);
        if (fetchCallResponse.isSuccessResponse) {
            trackInfo = fetchCallResponse.httpResponse as unknown as SpotifyTrack;
            return trackInfo;
        } else {
            throw new ExternalApiCallError("Exception while getting track info", fetchCallResponse);
        }
    }
}
