import dotenv from "dotenv";
dotenv.config();

// Constants Keys

export const APP_STATE_KEY = "spotify-auth-state";
export const APP_ACCESS_TOKEN = "spotify-access-token";
export const APP_REFRESH_TOKEN = "spotify-refresh-token";
export const APP_TOKEN_EXPIRY = "spotify-token-expiry";
export const APP_USER_AUTH = "spotify-user-auth";

// From environment (.env)
export const SERVER_LOG_LEVEL: string = process.env.SERVER_LOG_LEVEL!;
export const SERVER_PORT: number = parseInt(process.env.SERVER_PORT!);

export const SPOTIFY_SONG_RECOMMENDATIONS: string = process.env.SPOTIFY_SONG_RECOMMENDATIONS!;
export const SPOTIFY_SONG_MARKET: string = process.env.SPOTIFY_SONG_MARKET!;

export const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID!;
export const SPOTIFY_CLIENT_SECRET: string = process.env.SPOTIFY_CLIENT_SECRET!;
export const SPOTIFY_CLIENT_AUTH: string = process.env.SPOTIFY_CLIENT_AUTH!;
export const SPOTIFY_AUTH_HEADER: string = process.env.SPOTIFY_AUTH_HEADER!;
export const SPOTIFY_AUTH_SCOPE: string = process.env.SPOTIFY_AUTH_SCOPE!;

export const REDIRECT_URI: string = process.env.REDIRECT_URI!;
export const SPOTIFY_TOKEN_URL: string = process.env.SPOTIFY_TOKEN_URL!;
export const SPOTIFY_USER_AUTH_URL: string = process.env.SPOTIFY_USER_AUTH_URL!;
export const SPOTIFY_TRACK_RECOMMENDATION_URL: string = process.env.SPOTIFY_TRACK_RECOMMENDATION_URL!;
export const SPOTIFY_TRACK_INFO_URL: string = process.env.SPOTIFY_TRACK_INFO_URL!;
