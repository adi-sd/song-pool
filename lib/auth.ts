import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: `https://accounts.spotify.com/authorize?grant_type=authorization_code&scope=${process.env.SPOTIFY_AUTH_SCOPE}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`,
        })
    ],
});
