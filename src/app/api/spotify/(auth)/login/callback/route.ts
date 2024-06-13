import { NextResponse } from "next/server";

export const GET = () => {
    return new NextResponse("GET on /spotify/login/callback is working!");
};
