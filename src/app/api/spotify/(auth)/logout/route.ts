import { NextResponse } from "next/server";

export const GET = () => {
    return new NextResponse("GET on /spotify/logout is working!");
};
