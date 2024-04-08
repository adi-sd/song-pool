import { HttpMethod } from "../types/commons.js";
import { FetchCallResponse } from "../types/errors.js";
import { Logger } from "./logger/logger.js";

export class FetchCall {
    static async httpCall(
        httpMethod: HttpMethod,
        url: string,
        params?: Record<string, string>,
        headers?: any,
        body?: any
    ): Promise<FetchCallResponse> {
        Logger.debug(`Executing ${httpMethod} for ${url}`);
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        const response = await fetch(fullUrl, {
            method: httpMethod,
            headers: headers,
            body: JSON.stringify(body),
        });

        let currentResponse = new FetchCallResponse(
            true,
            httpMethod,
            response.url,
            response.status,
            response.statusText
        );

        if (response.ok) {
            currentResponse.isSuccessResponse = true;
            currentResponse.httpResponse = await response.json();
            currentResponse.message = `${httpMethod} Success - ${response.status}: ${response.statusText}`;
            return currentResponse;
        } else {
            currentResponse.isSuccessResponse = false;
            currentResponse.httpResponse = await response.json();
            currentResponse.message = `${httpMethod} Error - ${response.status}: ${response.statusText}`;
            return currentResponse;
        }
    }
}
