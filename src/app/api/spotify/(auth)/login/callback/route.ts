import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
    let authSuccess = false;
    let reqParams = req.nextUrl.searchParams
    if (!reqParams.get("error")) {
        let code = reqParams.get("code");
    }
    return NextResponse.json({
        spotifyAuthSuccess: authSuccess,
    });
};
