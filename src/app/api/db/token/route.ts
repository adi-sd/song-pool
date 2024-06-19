import { SpotifyAuthResponse } from "@/app/utils/response-types";
import { NextApiHandler } from "next";

import { PrismaClient } from "@prisma/client";
import { PoolApiHeaders } from "@/app/utils/constants";

const prisma = new PrismaClient();

// url = http://localhost:3030/api/db/token?tokenType=access
const GET: NextApiHandler = async (req) => {
    const getDbTokenResponse = {
        token: "",
    };
    const tokenType = req.query.tokenType as string;
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
const POST: NextApiHandler = async (req) => {
    const { access_token, refresh_token } = req.body as SpotifyAuthResponse;

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

export { GET, POST };
