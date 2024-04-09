import { HttpMethod } from "../types/commons.js";
import { FetchCallResponse } from "../types/errors.js";
import { Logger } from "./logger/logger.js";

export class FetchCall {
    static async httpCall(
        httpMethod: HttpMethod,
        url: string,
        params?: Record<string, any>,
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

        currentResponse.httpResponse = await response.text();
        currentResponse.httpResponseType = "TEXT";

        if (response.ok) {
            currentResponse.isSuccessResponse = true;
            currentResponse.message = `${httpMethod} Success - ${response.status}: ${response.statusText}`;
            return currentResponse;
        } else {
            currentResponse.isSuccessResponse = false;
            currentResponse.message = `${httpMethod} Error - ${response.status}: ${response.statusText}`;
            return currentResponse;
        }
    }
}
