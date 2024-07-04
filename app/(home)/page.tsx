"use client";

// Components
import { MusicPlayer } from "@/components/music-player/music-player";
import { Suggestions } from "@/components/suggestions/suggestions";
import { Statistics } from "@/components/statistics/statistics";
import { EmptyCard } from "@/components/commons/empty-card";

// Hooks

export default function Home() {
    return (
        <>
            <div className="h-full w-[49%] mr-[1%]">
                <MusicPlayer className="h-full"></MusicPlayer>
            </div>
            <div className="flex flex-col h-full w-[49%] ml-[1%]">
                <Suggestions className="w-full h-[59%] mb-[1%]"></Suggestions>
                <Statistics className="w-full h-[39%] mt-[1%]"></Statistics>
            </div>
        </>
    );

    // // Return Empty Cards
    // return (
    //     <>
    //         <div className="h-full w-[49%] mr-[1%]">
    //             <EmptyCard className="h-full"></EmptyCard>
    //         </div>
    //         <div className="flex flex-col h-full w-[49%] ml-[1%]">
    //             <EmptyCard className="w-full h-[59%] mb-[1%]"></EmptyCard>
    //             <EmptyCard className="w-full h-[39%] mt-[1%]"></EmptyCard>
    //         </div>
    //     </>
    // );
}
