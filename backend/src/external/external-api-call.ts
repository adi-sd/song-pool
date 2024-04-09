import { SpotifyTrackRecommendations } from "../types/spotify-recommendations.js";
import { SpotifyTrack } from "../types/spotify-track.js";
import { FetchCall } from "../utils/fetch-call.js";
import { Logger } from "../utils/logger/logger.js";
import { ExternalApiCallError, FetchCallResponse } from "../types/errors.js";
import dotenv from "dotenv";
import { SpotifyAuth } from "./spotify-auth.js";
dotenv.config();

export class ExternalApiCall {
    private static spotifyAuthHeader: string = process.env.SPOTIFY_AUTH_HEADER!;
    private static songMarket: string = process.env.SONG_MARKET!;
    private static songRecommendations: string = process.env.SONG_RECOMMENDATIONS!;

    // Spotify Track Recommendations API
    public static async getRecommendedTracks(seedTrackId: string): Promise<SpotifyTrackRecommendations> {
        Logger.info("Getting Recommended Tracks");
        let recommendedTracks: SpotifyTrackRecommendations;
        const apiUrl: string = process.env.SPOTIFY_TRACK_RECOMMENDATION_URL!;
        const accessToken: string = await SpotifyAuth.getAccessToken()!;
        let params = {
            limit: ExternalApiCall.songRecommendations,
            seed_tracks: seedTrackId,
            market: ExternalApiCall.songMarket,
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
        const accessToken: string = await SpotifyAuth.getAccessToken()!;
        let params = {
            market: ExternalApiCall.songMarket,
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
