import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { Logger } from "./utils/logger/logger.js";
import { ExternalApiCall } from "./external/external-api-call.js";
import { ExternalApiCallError } from "./types/errors.js";
import { SpotifySDK } from "./external/spotify-sdk.js";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, "..", "public")));

const port = parseInt(process.env.SONG_POOL_SERVER_PORT!) || 3000;

let currentSpotifyWebSDK: SpotifySDK;

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
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

// Endpoints for Server Side Spotify User

app.get("/server-user-login", (req: Request, res: Response) => {
    Logger.info("GET - /server-user-login");
    let webApi = SpotifySDK.getUserAuthorization();
});

app.post("/server-user-login/callback", (req: Request, res: Response) => {
    Logger.info(JSON.stringify(req));
});

app.listen(port, () => {
    Logger.info(`Server is running at http://localhost:${port}`);
});
