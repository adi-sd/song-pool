import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    // console.log("Hi from Middle ware");
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();
    return res;
}
