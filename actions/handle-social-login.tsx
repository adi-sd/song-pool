"use server";

import { signIn, auth } from "@/lib/auth";

export const spotifyLogin = async (formData: FormData) => {
    const action = formData.get("action");
    await signIn(action?.toString());
};

export const spotifyLogOut = async () => {};
