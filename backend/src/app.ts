import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { Logger } from "./utils/logger/logger.js";
import { ExternalApiCall } from "./external/external-api-call.js";
import { ExternalApiCallError } from "./types/errors.js";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.SONG_POOL_SERVER_PORT!) || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("root");
});

app.get("/token", (req: Request, res: Response) => {
    ExternalApiCall.textToken()
        .then((spotifyAccessToken) => res.send(spotifyAccessToken))
        .catch((error: ExternalApiCallError) => {
            res.status(500).send(error.fetchCallResponse);
        });
});

app.get("/recommendations", (req: Request, res: Response) => {
    let seedTrackId: string = req.query.seed_track_id as string;
    ExternalApiCall.getRecommendedTracks(seedTrackId)
        .then((recommendedTracks) => res.send(recommendedTracks))
        .catch((error: ExternalApiCallError) => {
            res.status(500).send(error.fetchCallResponse);
        });
});

app.get("/track_info", (req: Request, res: Response) => {
    let trackId: string = req.query.track_id as string;
    ExternalApiCall.getTrackInfo(trackId)
        .then((trackInfo) => res.send(trackInfo))
        .catch((error: ExternalApiCallError) => {
            res.status(500).send(error.fetchCallResponse);
        });
});

app.listen(port, () => {
    Logger.info(`Server is running at http://localhost:${port}`);
});
