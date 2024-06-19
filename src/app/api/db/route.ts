import { PoolApiHeaders } from "@/app/utils/constants";
import { NextApiHandler } from "next";

// url = http://localhost:3030/api/db
const GET: NextApiHandler = (req, res) => {
    const getDbResponse = {};
    return Response.json(getDbResponse, PoolApiHeaders.POOL_API_SUCCESS);
};

export { GET };
