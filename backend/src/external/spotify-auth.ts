import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import querystring from "querystring";

import { Logger } from "../utils/logger.js";
import * as Constants from "../utils/constants.js";
import { generateRandomString } from "../utils/commons.js";
import { ExternalApiCallError, FetchCallResponse } from "../types/errors.js";
import { FetchCall } from "../utils/fetch-call.js";
import { CustomRequest } from "../utils/expiring-storage.js";

export class SpotifyAuth {
    public static async getAccessToken(): Promise<string> {
        Logger.info("Getting Spotify Auth Token");
        try {
            let params = {
                grant_type: "client_credentials",
            };
            let headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Constants.SPOTIFY_CLIENT_AUTH}`,
            };
            let fetchCallResponse = (await FetchCall.httpCall(
                "POST",
                Constants.SPOTIFY_TOKEN_URL,
                params,
                headers
            )) as FetchCallResponse;
            Logger.debug(`Got Response - ${fetchCallResponse.getJSONString()}`);
            if (fetchCallResponse.isSuccessResponse) {
                return fetchCallResponse.httpResponse.access_token;
            } else {
                throw new Error(JSON.stringify(fetchCallResponse));
            }
        } catch (error) {
            Logger.error("Exception while getting Spotify access token", error);
            throw error;
        }
    }

    public static async getAccessTokenWithCode(authCode: any): Promise<string> {
        Logger.info("Getting Spotify Auth Token");
        try {
            let params = {
                code: authCode,
                redirect_uri: Constants.REDIRECT_URI,
                grant_type: "authorization_code",
                json: true,
            };
            let headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Constants.SPOTIFY_CLIENT_AUTH}`,
            };
            let fetchCallResponse = (await FetchCall.httpCall(
                "POST",
                Constants.SPOTIFY_TOKEN_URL,
                params,
                headers
            )) as FetchCallResponse;
            Logger.debug(`Got Response - ${fetchCallResponse.getJSONString()}`);
            if (fetchCallResponse.isSuccessResponse) {
                return fetchCallResponse.httpResponse;
            } else {
                throw new Error(JSON.stringify(fetchCallResponse));
            }
        } catch (error) {
            Logger.error("Exception while getting Spotify access token", error);
            throw error;
        }
    }

    public static async refreshAccessToken(): Promise<string> {
        Logger.info("Refreshing the access token");
        try {
            let params = {
                grant_type: "refresh_token",
                refresh_token: localStorage.getItem(Constants.APP_REFRESH_TOKEN),
                client_id: Constants.SPOTIFY_CLIENT_ID,
                client_secret: Constants.SPOTIFY_CLIENT_SECRET,
            };
            let fetchCallResponse = (await FetchCall.httpCall(
                "POST",
                Constants.SPOTIFY_TOKEN_URL,
                params
            )) as FetchCallResponse;
            Logger.debug(`Got Response - ${fetchCallResponse.getJSONString()}`);
            if (fetchCallResponse.isSuccessResponse) {
                return fetchCallResponse.httpResponse;
            } else {
                throw new Error(JSON.stringify(fetchCallResponse));
            }
        } catch (error) {
            Logger.error("Exception while refreshing the Spotify Access Token", error);
            throw error;
        }
    }

    public static async testToken(): Promise<string> {
        return await SpotifyAuth.getAccessToken();
    }

    public static handleUserAuthorization(req: Request, res: Response) {
        let expiringStorage = (req as CustomRequest).expiringStorage!;
        const state: string = generateRandomString(16);
        expiringStorage.setItem(Constants.APP_STATE_KEY, state);
        let params = {
            client_id: Constants.SPOTIFY_CLIENT_ID,
            response_type: "code",
            scope: Constants.SPOTIFY_AUTH_SCOPE,
            redirect_uri: Constants.REDIRECT_URI,
            show_dialog: true,
            state: state,
        };
        res.redirect(Constants.SPOTIFY_USER_AUTH_URL + "?" + querystring.stringify(params));
    }

    public static handleAuthorizationCallback(req: Request, res: Response) {
        let expiringStorage = (req as CustomRequest).expiringStorage!;
        let code = req.query.code || null;
        let state = req.query.state || null;
        let storedState = expiringStorage.getItem(Constants.APP_STATE_KEY)
            ? expiringStorage.getItem(Constants.APP_STATE_KEY)
            : null;

        if (state === null || state != storedState) {
            res.redirect(
                "/#" +
                    querystring.stringify({
                        error: "state_mismatch",
                    })
            );
        } else {
            expiringStorage.deleteItem(Constants.APP_STATE_KEY);
            SpotifyAuth.getAccessTokenWithCode(code)
                .then((accessResponse) => {
                    let tokenResponseObject = JSON.parse(accessResponse);
                    expiringStorage.setItem(Constants.APP_ACCESS_TOKEN, tokenResponseObject.access_token);
                    expiringStorage.setItem(Constants.APP_REFRESH_TOKEN, tokenResponseObject.refresh_token);
                    expiringStorage.setItem(Constants.APP_TOKEN_EXPIRY, tokenResponseObject.expires_in);
                    res.send("Successful user Authorizations! Tokens Stored!");
                })
                .catch((error: ExternalApiCallError) => {
                    Logger.error("Exception in Handling Auth Callback", error);
                    res.status(500).send(error.fetchCallResponse);
                });
            Logger.debug(`Access Token - ${expiringStorage.getItem(Constants.APP_ACCESS_TOKEN)}`);
            Logger.debug(`Refresh Token - ${expiringStorage.getItem(Constants.APP_REFRESH_TOKEN)}`);
            Logger.debug(`Expiry - ${expiringStorage.getItem(Constants.APP_TOKEN_EXPIRY)}`);
        }
    }
}
