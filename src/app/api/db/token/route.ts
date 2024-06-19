import { SpotifyAuthResponse } from "@/app/utils/response-types";
import { PrismaClient } from "@prisma/client";
import { PoolApiHeaders } from "@/app/utils/constants";

const prisma = new PrismaClient();

// url = http://localhost:3030/api/db/token?tokenType=access
export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url!);
    const getDbTokenResponse = {
        token: "",
    };
    const tokenType = searchParams.get("tokenType");
    let dbResponseGet = await prisma.spotifyAuthTable.findFirst();
    if (dbResponseGet) {
        if (tokenType === "access") {
            getDbTokenResponse["token"] = dbResponseGet.accessToken!;
        } else if (tokenType === "refresh") {
            getDbTokenResponse["token"] = dbResponseGet.refreshToken!;
        }
        return Response.json(getDbTokenResponse, PoolApiHeaders.POOL_API_SUCCESS);
    } else {
        return Response.json(getDbTokenResponse, PoolApiHeaders.POOL_API_ERROR);
    }
};

// url = http://localhost:3030/api/db/token body = { access_token: "", refresh_token: "" }
export const POST = async (req: Request) => {
    const reqBody = await req.json();
    const { access_token, refresh_token } = reqBody as SpotifyAuthResponse;

    // Delete all existing tokens from the database before storing the new one
    await prisma.spotifyAuthTable.deleteMany();

    // Store the new token in the database
    let postDbTokenResponse = await prisma.spotifyAuthTable.create({
        data: {
            accessToken: access_token,
            refreshToken: refresh_token,
        },
    });
    return Response.json(postDbTokenResponse, PoolApiHeaders.POOL_API_SUCCESS);
};
