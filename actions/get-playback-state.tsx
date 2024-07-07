export const getPlayBackState = async (authToken: string) => {
    const urlString: string = "https://api.spotify.com/v1/me/player";
    try {
        const response = await fetch(urlString, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${authToken}`,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Could not get Playback State");
            return null;
        }
    } catch (error) {
        console.error((error as Error).message);
        throw error;
    }
};
