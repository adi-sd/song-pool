import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import querystring from "querystring";
import cookieParser from "cookie-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { Logger } from "./utils/logger/logger.js";
import { ExternalApiCall } from "./external/external-api-call.js";
import { ExternalApiCallError, FetchCallResponse } from "./types/errors.js";
import { SpotifySDK } from "./external/spotify-sdk.js";
import { SpotifyAuth } from "./external/spotify-auth.js";
import { generateRandomString } from "./utils/commons.js";
import { access, stat } from "fs";
import { json } from "stream/consumers";
import { FetchCall } from "./utils/fetch-call.js";

const app: Express = express();
app.use(express.static(path.resolve(__dirname, "..", "public")))
    .use(cors())
    .use(cookieParser());

const PORT = parseInt(process.env.SONG_POOL_SERVER_PORT!) || 3000;
const STATE_KEY = "spotify-auth-state";

let currentSpotifyWebSDK: SpotifySDK;

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
    const authUrl: string = process.env.SPOTIFY_USER_AUTH_URL!;
    const clientId: string = process.env.SPOTIFY_CLIENT_ID!;
    const redirectUri: string = process.env.REDIRECT_URI!;
    const scope: string = process.env.SPOTIFY_AUTH_SCOPE!;
    const state: string = generateRandomString(16);
    res.cookie(STATE_KEY, state);
    let params = {
        client_id: clientId,
        response_type: "code",
        scope: scope,
        redirect_uri: redirectUri,
        show_dialog: true,
        state: state,
    };
    res.redirect(authUrl + "?" + querystring.stringify(params));
});

app.get("/login/callback", (req: Request, res: Response) => {
    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[STATE_KEY] : null;

    if (state === null || state != storedState) {
        res.redirect(
            "/#" +
                querystring.stringify({
                    error: "state_mismatch",
                })
        );
    } else {
        res.clearCookie(STATE_KEY);
        SpotifyAuth.getAccessTokenWithCode(code)
            .then((accessResponse) => {
                res.send(accessResponse);
            })
            .catch((error: ExternalApiCallError) => {
                res.status(500).send(error.fetchCallResponse);
            });
    }
});

app.listen(PORT, () => {
    Logger.info(`Server is running at http://localhost:${PORT}`);
});
