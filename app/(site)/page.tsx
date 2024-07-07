"use client";

// Components
import React from "react";
import { EmptyCard } from "../../components/commons/empty-card";

// Hooks

export default function Site() {
    // Return Empty Cards
    return (
        <>
            <div className="h-full w-[49%] mr-[1%]">
                <EmptyCard className="h-full"></EmptyCard>
            </div>
            <div className="flex flex-col h-full w-[49%] ml-[1%]">
                <EmptyCard className="w-full h-[59%] mb-[1%]"></EmptyCard>
                <EmptyCard className="w-full h-[39%] mt-[1%]"></EmptyCard>
            </div>
        </>
    );
}
