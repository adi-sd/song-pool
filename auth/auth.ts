import NextAuth, { type User } from "next-auth";
// import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { AdapterUser } from "next-auth/adapters";
import { getUserAccountByUserId } from "../data/account";
import { refreshToken } from "@/actions/access-token";

export const { handlers, signIn, signOut, auth } = NextAuth({
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
            let account = await getUserAccountByUserId(user.id!);
            console.log({ linkAccount: account });
        },
    },
    callbacks: {
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as AdapterUser;
            }
            if (token.access_token) {
                session.token = token.access_token;
            }
            // console.log({sessionToken: token, sessionSession: session});
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                const userProfile: User = {
                    id: token.sub,
                    name: token?.name,
                    email: token?.email,
                    image: token?.picture,
                };
                return {
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    expires_in: account.expires_in,
                    refresh_token: account.refresh_token,
                    user: userProfile,
                };
            } else if (Date.now() < token.exp! * 1000) {
                return token;
            } else {
                if (!token.refresh_token) {
                    throw new Error("Missing refresh token");
                }
                try {
                    const body = await refreshToken(token);
                    return {
                        ...token,
                        access_token: body.access_token,
                        refresh_token: body.refresh_token ?? token.refresh_token,
                        expires_at: Math.floor(Date.now() / 1000 + (body.expires_in as number)),
                        expires_in: body.expires_in,
                    };
                } catch (error) {
                    // The error property can be used client-side to handle the refresh token error
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" as const };
                }
            }
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});

declare module "next-auth" {
    interface Session {
        token: string;
        error?: "RefreshAccessTokenError";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token?: string;
        expires_in?: number;
        expires_at?: number;
        refresh_token?: string;
        error?: "RefreshAccessTokenError";
    }
}
