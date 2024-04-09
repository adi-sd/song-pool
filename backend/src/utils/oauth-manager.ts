interface OAuthTokens {
    accessToken: string | null;
    refreshToken: string | null;
    code: string | null;
    state: string | null;
    expiresAt: number | null;
}

class OAuthManager {
    private readonly storageKey: string;
    private tokens: OAuthTokens;

    constructor(storageKey: string) {
        this.storageKey = storageKey;
        this.tokens = this.loadTokens();
    }

    private loadTokens(): OAuthTokens {
        const storedData = localStorage.getItem(this.storageKey);
        return storedData
            ? JSON.parse(storedData)
            : {
                  accessToken: null,
                  refreshToken: null,
                  code: null,
                  state: null,
                  expiresAt: null,
              };
    }

    private saveTokens(tokens: OAuthTokens): void {
        localStorage.setItem(this.storageKey, JSON.stringify(tokens));
        this.tokens = tokens;
    }

    setTokens(tokens: OAuthTokens): void {
        this.saveTokens(tokens);
    }

    getTokens(): OAuthTokens {
        return this.tokens;
    }

    clearTokens(): void {
        localStorage.removeItem(this.storageKey);
        this.tokens = {
            accessToken: null,
            refreshToken: null,
            code: null,
            state: null,
            expiresAt: null,
        };
    }

    isAccessTokenValid(): boolean {
        return !!this.tokens.accessToken && Date.now() < (this.tokens.expiresAt || 0);
    }

    async refreshAccessToken(): Promise<void> {
        if (!this.tokens.refreshToken) {
            throw new Error("Refresh token is missing.");
        }

        // Call your backend API to refresh the access token using the refresh token.
        // Update this.tokens.accessToken and this.tokens.expiresAt with the new values.
        // Example:
        // const newAccessToken = await yourBackendApi.refreshAccessToken(this.tokens.refreshToken);
        // this.tokens.accessToken = newAccessToken.accessToken;
        // this.tokens.expiresAt = newAccessToken.expiresAt;

        // For demonstration purposes, let's assume a simple refresh mechanism:
        const newAccessToken = "new_access_token";
        const newExpiresAt = Date.now() + 3600 * 1000; // Assuming the new access token expires in 3600 seconds

        this.tokens.accessToken = newAccessToken;
        this.tokens.expiresAt = newExpiresAt;

        this.saveTokens(this.tokens);
    }
}

// Example usage:
const oAuthManager = new OAuthManager("oauth_tokens");
const tokens = oAuthManager.getTokens();

// Check if access token is valid
if (!oAuthManager.isAccessTokenValid()) {
    // Access token expired, refresh it
    oAuthManager
        .refreshAccessToken()
        .then(() => {
            console.log("Access token refreshed successfully.");
            const newTokens = oAuthManager.getTokens();
            console.log("New access token:", newTokens.accessToken);
        })
        .catch((error) => {
            console.error("Failed to refresh access token:", error);
        });
}
