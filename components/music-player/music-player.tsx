"use client";

import { useEffect, useState } from "react";
// import { SessionProvider, signIn, useSession } from "next-auth/react";

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { Card } from "../commons/card";

// Server Actions
import { getPlayBackState } from "@/actions/playback-state";
import { MusicTrack } from "./music-track";
import { Device, Track } from "spotify-api.js";
import { useSession } from "next-auth/react";
import { signIn } from "@/auth/auth";

interface MusicPlayerProps {
    className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const [playBackState, setPlayBackState] = useState<any>();

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError" || status == "unauthenticated") {
            signIn();
        }
    }, [session, status]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const playBackState = await getPlayBackState();
                if (playBackState.error) {
                    console.error("Nothing is playing on spotify!");
                } else {
                    // console.log(playBackState.data);
                    setPlayBackState(playBackState.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Card title="Currently Playing" className={twMerge("", className)}>
                <div className="flex w-full h-full items-center justify-center">Loading...</div>
            </Card>
        );
    }

    return (
        <Card title="Currently Playing" className={twMerge("", className)}>
            <div className="w-full h-full">
                {playBackState ? (
                    <MusicTrack
                        trackItem={playBackState.item as Track}
                        isPlaying={playBackState.is_playing}
                        deviceItem={playBackState.device as Device}
                    ></MusicTrack>
                ) : (
                    <h2>Nothings Playing!</h2>
                )}
            </div>
        </Card>
    );
};
