import { HttpMethod } from "./commons.js";

export class FetchCallResponse {
    isSuccessResponse: boolean;
    forHttpMethod: HttpMethod;
    forHttpUrl: string;
    httpStatusCode: number;
    httpStatusMessage: string;
    httpResponse?: any;
    message?: string;

    constructor(
        isSuccessResponse: boolean,
        forHttpMethod: HttpMethod,
        forHttpUrl: string,
        httpStatusCode: number,
        httpStatusMessage: string,
        httpResponse?: any,
        message?: string
    ) {
        this.isSuccessResponse = isSuccessResponse;
        this.forHttpMethod = forHttpMethod;
        this.forHttpUrl = forHttpUrl;
        this.httpStatusCode = httpStatusCode;
        this.httpStatusMessage = httpStatusMessage;
        this.httpResponse = httpResponse;
        this.message = message;
    }

    getJSONString(): string {
        return JSON.stringify(this);
    }
}

export class ExternalApiCallError extends Error {
    fetchCallResponse: FetchCallResponse;
    constructor(message: string, fetchCallResponse: FetchCallResponse) {
        super(message);
        this.name = this.constructor.name;
        this.fetchCallResponse = fetchCallResponse;
        Object.setPrototypeOf(this, ExternalApiCallError.prototype);
    }
}
