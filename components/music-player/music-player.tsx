"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { Card } from "../commons/card";

// Server Actions
import { getPlayBackState } from "@/actions/get-playback-state";

interface MusicPlayerProps {
    className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();

    const [playBackState, setPlayBackState] = useState(null);

    useEffect(() => {
        const fetchData = async (authToken: string) => {
            setIsLoading(true);
            try {
                const playBackState = await getPlayBackState(authToken);
                setPlayBackState(playBackState);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (session && status === "authenticated") {
            fetchData(
                "BQCMc9l4ttByOIP7_oYxUydha4Yzx3e2QyEbTm3Eyrb-8fwreWyPfAux8yYAIxysQJaG-PcfShh6zv68TSGPVISzbidY_zrgg0kytRioFKvaguYEvp4MFn9RSnOWTl77Fbs05FdkglRNANTBwNZplzUZhLm2aioMZuty751PHt42qnm-6HqYjHPHgvfabpRZI-KkNjZwViSrO92d63Lnnky5Z62j"
            );
        }
    }, [session, status]);

    return (
        <Card title="Currently Playing" className={twMerge("", className)}>
            <div>Music Player Content</div>
            <p>{JSON.stringify(playBackState)}</p>
        </Card>
    );
};
