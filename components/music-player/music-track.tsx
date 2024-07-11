"use client";

import { Track, Artist, Device } from "spotify-api.js";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { MusicControls } from "./music-controls";

interface MusicTrackProps {
    className?: string;
    trackItem: Track;
    deviceItem: Device;
    isPlaying: boolean;
}

export const MusicTrack: React.FC<MusicTrackProps> = ({ className, trackItem, deviceItem, isPlaying }) => {
    return (
        <div className={twMerge("w-full h-full p-2 flex flex-col gap-y-5", className)}>
            <div className="w-full flex items-center justify-center py-8">
                <Image
                    priority
                    height={550}
                    width={550}
                    src={trackItem.album?.images[0].url!}
                    alt={`${trackItem.album?.name} Album Art`}
                ></Image>
            </div>
            <div className="w-full flex flex-1">
                <div className="w-[70%] flex flex-col items-center justify-center border border-black rounded-lg drop-shadow-lg p-5">
                    <div className="w-full flex flex-col gap-y-3 overflow-hidden mb-3">
                        <h1 className="text-3xl text-nowrap font-bold ">{trackItem.name}</h1>
                        <p className="text-lg text-nowrap text-clip">{trackItem.album?.name}</p>
                        <p className="text-xl text-nowrap font-semibold text-ellipsis">
                            {getArtistsNameString(trackItem.artists)}
                        </p>
                    </div>
                    <MusicControls
                        isPlaying={isPlaying}
                        deviceId={deviceItem.id ? deviceItem.id : undefined}
                    ></MusicControls>
                </div>
                <div className="w-[30%] flex flex-col gap-y-2 items-center justify-center">Device details</div>
            </div>
        </div>
    );
};

const getArtistsNameString = (artists: Artist[]) => {
    if (artists.length === 0) return "";
    let result = "";
    for (let artist of artists) {
        if (result) {
            result = result + ", " + artist.name;
        } else {
            result = artist.name;
        }
    }
    return result;
};
