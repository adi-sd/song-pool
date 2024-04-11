import { SpotifyTrackRecommendations } from "../types/spotify-recommendations.js";
import { SpotifyTrack } from "../types/spotify-track.js";
import { FetchCall } from "../utils/fetch-call.js";
import { Logger } from "../utils/logger.js";
import * as Constants from "../utils/constants.js";
import { ExternalApiCallError, FetchCallResponse } from "../types/errors.js";

export class ExternalApiCall {
    // Spotify Track Recommendations API
    public static async getRecommendedTracks(
        seedTrackId: string,
        accessToken: string
    ): Promise<SpotifyTrackRecommendations> {
        Logger.info("Getting Recommended Tracks");
        let recommendedTracks: SpotifyTrackRecommendations;
        const apiUrl: string = process.env.SPOTIFY_TRACK_RECOMMENDATION_URL!;
        let params = {
            limit: Constants.SPOTIFY_SONG_RECOMMENDATIONS,
            seed_tracks: seedTrackId,
            market: Constants.SPOTIFY_SONG_MARKET,
        };
        let headers = {
            "Content-Type": "application/json",
            Authorization: `${Constants.SPOTIFY_AUTH_HEADER} ${accessToken}`,
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
    public static async getTrackInfo(trackId: string, accessToken: string): Promise<SpotifyTrack> {
        Logger.info("Getting Track Information");
        let trackInfo: SpotifyTrack;
        const apiUrl: string = process.env.SPOTIFY_TRACK_INFO_URL! + `/${trackId}`;
        let params = {
            market: Constants.SPOTIFY_SONG_MARKET,
        };
        let headers = {
            "Content-Type": "application/json",
            Authorization: `${Constants.SPOTIFY_AUTH_HEADER} ${accessToken}`,
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
