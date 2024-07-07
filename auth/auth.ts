import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getUserAccountByUserId } from "../data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
            let account = await getUserAccountByUserId(user.id!);
            console.log({linkAccount: account});
        },
    },
    callbacks: {
        async session({ token, session }) {
            console.log({sessionToken: token});
            console.log({session: session});

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({ token }) {
            console.log({jwt: token});
            
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            
            if (!existingUser) return token;
            token.role = existingUser.role;
            
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
