import { PoolApiHeaders } from "@/app/utils/constants";

// url = http://localhost:3030/api/db
const GET = (req: Request) => {
    const getDbResponse = {};
    return Response.json(getDbResponse, PoolApiHeaders.POOL_API_SUCCESS);
};

export { GET };
