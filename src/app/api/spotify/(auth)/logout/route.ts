import { PoolApiHeaders } from "@/app/utils/constants";

// url =  http://localhost:3030/api/spotify/logout
export const GET = async (req: Request) => {
    const getLogoutResponse = {};
    return Response.json(getLogoutResponse, PoolApiHeaders.POOL_API_SUCCESS);
};
