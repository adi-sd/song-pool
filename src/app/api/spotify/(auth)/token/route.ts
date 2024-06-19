import { PoolApiHeaders } from "@/app/utils/constants";

// url = http://localhost:3030/api/spotify/token
export const GET = async (req: Request) => {
    const getTokenResponse = {};
    return Response.json(getTokenResponse, PoolApiHeaders.POOL_API_SUCCESS);
};
