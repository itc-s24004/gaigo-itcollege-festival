import { db_addUser } from "@/libs/db/users";
import { getUserInfo } from "@/libs/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const userInfo = await getUserInfo();
    const user = userInfo.user;

    if (!userInfo.email || !userInfo.isGoogleLogin) return NextResponse.json(
        {
            message: "Not logged in with Google."
        },
        { status: 401 }
    );

    if (user) return NextResponse.json(
        {
            message: "User already registered."
        },
        { status: 400 }
    );

    const form = await req.formData();
    const nickName = form.get("nickName") as string | null;

    if (!nickName || nickName.length < 3 || nickName.length > 32) return NextResponse.json(
        {
            message: "Invalid nickname. It must be between 3 and 32 characters."
        },
        { status: 400 }
    );

    const userId = await db_addUser(userInfo.email, nickName);
    console.log("New user registered:", userId);
    
    return NextResponse.redirect(new URL("/account", req.nextUrl.origin));

}