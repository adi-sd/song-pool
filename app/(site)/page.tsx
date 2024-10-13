"use client";

// Components
import React, { useEffect } from "react";
import { EmptyCard } from "../../components/commons/empty-card";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "@/auth/auth";

// Hooks

export default function Site() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError" || status == "unauthenticated") {
            // signIn();
        }
    }, [session, status]);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/home");
        }
    }, [router, status]);

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
