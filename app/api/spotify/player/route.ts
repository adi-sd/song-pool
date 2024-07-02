import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    // const response = await fetch("https://api.spotify.com/v1/me/player")
    console.log("Hi there here in /api/spotify/player route");
    console.log(req.nextUrl.searchParams.get("code"));
    return Response.json({desc: "hello"});
}