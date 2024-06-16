import { LocalStorageLiterals } from "@/app/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
    let authSuccess = false;
    let reqParams = req.nextUrl.searchParams;
    if (!reqParams.get("error")) {
        let code = reqParams.get("code");
        if (code !== null) {
            getAccessTokenWithCode(code).then((tokenResponse) => {
                // const response = NextResponse.json(JSON.parse(tokenResponse), {
                //     status: 200,
                //     headers: { "Content-Type": "application/json" },
                // });
                // response.cookies.set({
                //     name: "token",
                //     path: "/",
                //     value: tokenResponse,
                // });
                // return response;
                //localStorage.setItem(LocalStorageLiterals.SPOTIFY_TOKEN, JSON.parse(tokenResponse).access_token);
                authSuccess = true;
            });
        }
    }
};

async function getAccessTokenWithCode(authCode: string): Promise<string> {
    try {
        let params = {
            code: authCode,
            redirect_uri: process.env.REDIRECT_URI!,
            grant_type: "authorization_code",
            json: "true",
        };
        let headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${process.env.SPOTIFY_CLIENT_AUTH!}`,
        };
        const tokenResponse = await fetch(process.env.SPOTIFY_TOKEN_URL!, {
            method: "POST",
            body: new URLSearchParams(params),
            headers: new Headers(headers),
            next: { revalidate: 3600 },
        }).then((response) => response.json());
        console.debug(tokenResponse);
        return JSON.stringify(tokenResponse);
    } catch (error) {
        console.error("Error While Getting Spotify Auth Token With Code", error);
        throw error;
    }
}
