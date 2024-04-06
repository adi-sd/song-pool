import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { Logger } from "./utils/logger/logger.js";
import { ExternalApiCall } from "./external/external-api-call.js";

dotenv.config();

const app: Express = express();
const port = process.env.SONG_POOL_SERVER_PORT || 3000;
const externalCall = ExternalApiCall.getInstance();

app.get("/", (req: Request, res: Response) => {
    res.send("root");
});

app.get("/token", (req: Request, res: Response) => {
    res.send(externalCall.testToken());
});

app.listen(port, () => {
    Logger.info(`Server is running at http://localhost:${port}`);
});
