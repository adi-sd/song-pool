import { PoolApiHeaders } from "@/app/utils/constants";
import { NextApiHandler } from "next";

// url =  http://localhost:3030/api/spotify/logout
const GET: NextApiHandler = (req, res) => {
    const getLogoutResponse = {};
    return Response.json(getLogoutResponse, PoolApiHeaders.POOL_API_SUCCESS);
};

export { GET };
