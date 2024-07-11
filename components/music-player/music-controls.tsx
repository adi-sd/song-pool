"use client";

import { FaPlay, FaPause } from "react-icons/fa";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";

import { Button } from "../commons/button";
import { useState } from "react";
import { pauseOrResumePlayback, playNextOrPrevious } from "@/actions/playback-state";

interface MusicControlsProps {
    isPlaying: boolean;
    deviceId?: string;
}

export const MusicControls: React.FC<MusicControlsProps> = ({ isPlaying, deviceId }) => {
    const [isMusicPlaying, setIsMusicPlaying] = useState(isPlaying);

    const handlePlayPause = async () => {
        await pauseOrResumePlayback(isMusicPlaying);
        setIsMusicPlaying(!isMusicPlaying);
    };

    const handlePreviousTrack = async () => {
        await playNextOrPrevious(false, deviceId);
    };

    const handleNextTrack = async () => {
        await playNextOrPrevious(true, deviceId);
    };

    return (
        <div className="w-[80%] flex items-center justify-center py-2">
            <div className="mr-auto">
                <Button onClick={handlePreviousTrack} className="text-3xl p-8 mx-1">
                    <RxTrackPrevious size={25} style={{ fontWeight: "bold" }}></RxTrackPrevious>
                </Button>
            </div>
            <div>
                <Button onClick={handlePlayPause} className={`text-3xl p-10 mx-1 ${isMusicPlaying ? "" : "pl-11"}`}>
                    {isMusicPlaying ? <FaPause size={35}></FaPause> : <FaPlay size={35}></FaPlay>}
                </Button>
            </div>
            <div className="ml-auto">
                <Button onClick={handleNextTrack} className="text-3xl p-8 mx-1">
                    <RxTrackNext size={25} style={{ fontWeight: "bold" }}></RxTrackNext>
                </Button>
            </div>
        </div>
    );
};
