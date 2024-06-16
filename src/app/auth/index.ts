import NextAuth, { NextAuthConfig } from "next-auth";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import Auth0, { SpotifyProfile } from "next-auth/providers/spotify";

export const BASE_PATH = "/api/spotify/auth";

const userConfig: OAuthUserConfig<SpotifyProfile> ={
            clientId: process.env.NEXTAUTH_SECRET,
            clientSecret: process.env.NEXTAUTH_SECRET,
        };

function SpotifyProvider<P extends SpotifyProfile>(): OAuthConfig<P> {
    return {
        id: "spotify",
        name: "Spotify",
        type: "oauth",
        authorization: "https://accounts.spotify.com/authorize?scope=user-read-email",
        token: "https://accounts.spotify.com/api/token",
        userinfo: "https://api.spotify.com/v1/me",
        profile(profile) {
            return {
                id: profile.id,
                name: profile.display_name,
                email: profile.email,
                image: profile.images?.[0]?.url,
            };
        },
        style: { brandColor: "#1db954" },
        userConfig,
    };
}

const authOptions: NextAuthConfig = {
    providers: [SpotifyProvider],
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET,
};
