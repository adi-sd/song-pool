import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { Logger } from "./utils/logger/logger.js";
import { ExternalApiCall } from "./external/external-api-call.js";
import { ExternalApiCallError } from "./types/errors.js";
import { SpotifyAuth } from "./external/spotify-auth.js";
import { CustomRequest, expiringStorageMiddleware } from "./utils/expiring-storage.js";

// Express App
const app: Express = express();
app.use(express.static(path.resolve(__dirname, "..", "public")))
    .use(cors())
    .use(expiringStorageMiddleware);

// Constants
const PORT = parseInt(process.env.SONG_POOL_SERVER_PORT!) || 3000;
const APP_ACCESS_TOKEN = "spotify-access-token";
const APP_REFRESH_TOKEN = "spotify-refresh-token";
const APP_TOKEN_EXPIRY = "spotify-token-expiry";
//

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/token", (req: Request, res: Response) => {
    SpotifyAuth.testToken()
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

app.get("/login", (req: Request, res: Response) => {
    Logger.info("GET - /login");
    SpotifyAuth.handleUserAuthorization(req, res);
});

app.get("/login/callback", (req: Request, res: Response) => {
    Logger.info("GET - /login/callback");
    SpotifyAuth.handleAuthorizationCallback(req, res);
});

app.listen(PORT, () => {
    Logger.info(`Server is running at http://localhost:${PORT}`);
});
