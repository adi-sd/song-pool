import { PoolApiHeaders } from "@/app/utils/constants";
import { NextApiHandler } from "next";

// url = http://localhost:3030/api/spotify/token
const GET: NextApiHandler = (req, res) => {
    const getTokenResponse = {};
    return Response.json(getTokenResponse, PoolApiHeaders.POOL_API_SUCCESS);
};

export { GET };
