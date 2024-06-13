interface queryParamsObject {
    [key: string]: string | boolean;
}

function objectToQueryString(obj: queryParamsObject): string {
    const params = new URLSearchParams();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.append(key, String(obj[key]));
        }
    }
    return params.toString();
}

export const getSpotifyAuthUrl = (): string => {
    const params: queryParamsObject = {
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        response_type: "code",
        scope: process.env.SPOTIFY_AUTH_SCOPE!,
        redirect_uri: process.env.REDIRECT_URI!,
        show_dialog: true,
    };
    const authUrl = process.env.SPOTIFY_USER_AUTH_URL + "?" + objectToQueryString(params);
    return authUrl;
};
