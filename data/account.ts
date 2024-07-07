import {db} from "../lib/db"

export const getUserAccountByUserId = async (id: string) => {
    try {
        const account = await db.account.findUnique({
            where: {
                id,
            },
        });
        return account;
    } catch (error) {
        console.error(error);
        return null;
    }
}