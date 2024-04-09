import { SpotifyApi, RecommendationsRequest, Track, Market } from "@spotify/web-api-ts-sdk";
import dotenv from "dotenv";
dotenv.config();

import { Logger } from "../utils/logger/logger.js";

export class SpotifySDK {
    private static instance: SpotifySDK | null = null;
    private currentWebAPI: SpotifyApi;

    private static spotifyMarket: string = process.env.SONG_MARKET!;
    private static songRecommendations: number = parseInt(process.env.SONG_RECOMMENDATIONS!);
    private static spotifyClientId: string = process.env.SPOTIFY_CLIENT_ID!;
    private static scopes: string[] = process.env.SPOTIFY_AUTH_SCOPE!.split(",");

    private constructor(webApi: SpotifyApi) {
        this.currentWebAPI = webApi;
    }

    public static getInstance(webApi: SpotifyApi): SpotifySDK {
        if (SpotifySDK.instance) {
            return SpotifySDK.instance;
        } else {
            return new SpotifySDK(webApi);
        }
    }

    public static getUserAuthorization() {
        let sdk: SpotifyApi;
        try {
            sdk = SpotifyApi.withUserAuthorization(
                SpotifySDK.spotifyClientId,
                "http://localhost:3456/server-user-login/callback",
                SpotifySDK.scopes
            );
        } catch (error) {
            Logger.error("Exception while getting user Authorization", error);
            throw error;
        }
        return sdk;
    }

    async getTrackRecommendations(seed_track_id: string): Promise<Track[]> {
        let request: RecommendationsRequest = {
            limit: SpotifySDK.songRecommendations,
            market: SpotifySDK.spotifyMarket,
            seed_tracks: [seed_track_id],
        };
        Logger.debug(JSON.stringify(request));
        try {
            let apiResponse = await this.currentWebAPI.recommendations.get(request);
            return apiResponse.tracks;
        } catch (error) {
            Logger.error("Exception while getting track recommendations from spotify web api", error);
            throw error;
        }
    }

    async getCurrentlyPlayingTrack(): Promise<Track> {
        try {
            let apiResponse = await this.currentWebAPI.player.getCurrentlyPlayingTrack(
                SpotifySDK.spotifyMarket as Market
            );
            return apiResponse.item as Track;
        } catch (error) {
            Logger.error("Exception while getting track recommendations from spotify web api", error);
            throw error;
        }
    }
}
