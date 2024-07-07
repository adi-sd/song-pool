import { type NextAuthConfig } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: `https://accounts.spotify.com/authorize?scope=${process.env.SPOTIFY_AUTH_SCOPE}`,
        })
    ],
} satisfies NextAuthConfig;