import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import querystring from "querystring";

import { Logger, LogRequestInfo } from "./utils/logger.js";
import * as Constants from "./utils/constants.js";
import { ExternalApiCall } from "./external/external-api-call.js";
import { ExternalApiCallError } from "./types/errors.js";
import { SpotifyAuth } from "./external/spotify-auth.js";
import { ExpiringStorageMiddleware } from "./utils/expiring-storage.js";

// Express App
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Express = express();

app.use(express.static(path.resolve(__dirname, "..", "public")))
    .use(cors())
    .use(ExpiringStorageMiddleware)
    .use(LogRequestInfo);

// Constants
const PORT = Constants.SERVER_PORT || 3000;

// root
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoints for Server Side Spotify User

app.get("/login", (req: Request, res: Response) => {
    Logger.info(`${req.method} : ${req.url}`);
    SpotifyAuth.handleUserAuthorization(req, res);
});

app.get("/login/callback", (req: Request, res: Response) => {
    Logger.info("GET - /login/callback");
    if (!req.query.error) {
        SpotifyAuth.handleAuthorizationCallback(req, res);
    } else {
        res.redirect(
            "/#" +
                querystring.stringify({
                    error: "User Authorization Denied!",
                })
        );
    }
});

app.get("/login/token", (req: Request, res: Response) => {
    SpotifyAuth.testToken()
        .then((spotifyAccessToken) => res.send(spotifyAccessToken))
        .catch((error: ExternalApiCallError) => {
            res.status(500).send(error.fetchCallResponse);
        });
});

app.get("/login/refresh-token", (req: Request, res: Request) => {});

// Spotify Web API Endpoints

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

//  Start the server

app.listen(PORT, () => {
    Logger.info(`Server is running at http://localhost:${PORT}`);
});
