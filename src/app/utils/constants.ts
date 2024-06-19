// For Local Storage
export class LocalStorageLiterals {
    static SPOTIFY_CODE = "spotify_code";
    static SPOTIFY_TOKEN_RESPONSE = "spotify_token_response";
    static SPOTIFY_TOKEN = "spotify_token";
}

export class PoolApiHeaders {
    static POOL_API_SUCCESS = {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    };

    static POOL_API_ERROR = {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
    };
}
