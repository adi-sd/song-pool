import { NextRequest, NextResponse } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// Server Actions
import { getSpotifyAccessToken } from "./actions/get-spotify-access-token";

// export async function middleware(req: NextRequest) {
//     // console.log("Hi from Middle ware");
//     const res = NextResponse.next();
//     const { nextUrl } = req;
//     const spotifyCode = nextUrl.searchParams.get("code");
//     const isSpotifyApi = nextUrl.pathname.startsWith("/api/spotify/");

//     if( !isSpotifyApi ) return res;

//     if(!spotifyCode) return res;

//     const spotifyAccessTokenResponse = await getSpotifyAccessToken(spotifyCode);
//     console.log("Toke Response Middle Ware ", spotifyAccessTokenResponse);

//     if(!spotifyAccessTokenResponse) return res;

//     console.log("Got spotify access token!")
//     res.cookies.set("spotify_token", spotifyAccessTokenResponse, {
//         name: "spotify_token",
//         value: spotifyAccessTokenResponse,
//         httpOnly: true,
//         path: "/api/spotify",
//         maxAge: spotifyAccessTokenResponse.expires_in as number
//     });

//     return res;
// }


export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();
    return res;
}
