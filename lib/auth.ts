import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: 'https://accounts.spotify.com/authorize?scope=user-read-private,user-read-email,user-read-currently-playing,user-read-playback-state,user-modify-playback-state',
        })
    ],
});
