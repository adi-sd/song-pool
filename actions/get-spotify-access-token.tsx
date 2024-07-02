export const getSpotifyAccessToken = async (code: string): Promise<string | null> => {
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic NWM0NzI3MzU0N2QxNDU0MjljY2ZmYzQ2M2VjZWQ4MGM6NTIyYWRiYzMxMTJhNDE4ODhiN2M3YzhkNDQ0OWY0NWM=`,
            }),
            body: new URLSearchParams({
                client_id: "5c47273547d145429ccffc463eced80c",
                grant_type: "authorization_code",
                code: code,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data["access_token"];
        } else {
            console.error("Could not get spotify access token!");
            return null;
        }
    } catch (error) {
        console.error((error as Error).message);
        throw error;
    }
};
