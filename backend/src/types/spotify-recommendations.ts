import { SpotifyTrack } from "./spotify-track.js";

interface Seed {
    initialPoolSize: number;
    afterFilteringSize: number;
    afterRelinkingSize: number;
    id: string;
    type: string;
    href: string;
}

export interface SpotifyTrackRecommendations {
    tracks: SpotifyTrack[];
    seeds: Seed;
}
