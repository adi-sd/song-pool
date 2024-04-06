import { Logger } from "./logger/logger.js";

export class FetchCall {
    static async httpCall(
        httpMethod: "GET" | "POST" | "PUT" | "DELETE",
        url: string,
        params?: Record<string, string>,
        headers?: any,
        body?: any
    ): Promise<any> {
        Logger.debug(`${httpMethod} for ${url}`);

        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const response = await fetch(fullUrl, {
            method: httpMethod,
            headers: headers,
            body: JSON.stringify(body),
        });
        if (response.ok) {
            return await response.json();
        } else {
            let errMessage = `${httpMethod} Error - ${response.status}: ${response.statusText}`;
            FetchCall.handleHttpError(errMessage);
            throw new Error(errMessage);
        }
    }

    private static handleHttpError(message: string, response?: string) {
        Logger.error(`Http error - ${message}; external Response - ${response}`);
    }

    private static handleFetchError(error: any, method: string) {
        Logger.error(`Error executing method - ${method} : ${error}`);
    }
}

// Example usage:
// (async () => {
//     try {
//         const responseData = await HttpClient.get("https://jsonplaceholder.typicode.com/posts/1");
//         console.log("GET Response:", responseData);

//         const postData = { title: "foo", body: "bar", userId: 1 };
//         const postResponse = await HttpClient.post("https://jsonplaceholder.typicode.com/posts", postData);
//         console.log("POST Response:", postResponse);

//         const putData = { id: 1, title: "updated title", body: "updated body", userId: 1 };
//         const putResponse = await HttpClient.put("https://jsonplaceholder.typicode.com/posts/1", putData);
//         console.log("PUT Response:", putResponse);

//         const deleteResponse = await HttpClient.delete("https://jsonplaceholder.typicode.com/posts/1");
//         console.log("DELETE Response:", deleteResponse);
//     } catch (error) {
//         console.error("Error:", error);
//     }
// })();
