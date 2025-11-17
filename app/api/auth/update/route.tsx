import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const userInfo = await getUserInfo();
    const user = userInfo.user;

    if (!user) return NextResponse.json(
        {
            message: "User not logged in."
        },
        { status: 401 }
    );

    const form = await req.formData();
    const newNickName = form.get("nickName") as string | null;

    if (!newNickName || newNickName.length < 3 || newNickName.length > 32) return NextResponse.json(
        {
            message: "Invalid nickname. It must be between 3 and 32 characters."
        },
        { status: 400 }
    );


    
    return NextResponse.json(
        {
            message: "Nickname updated successfully."
        },
        { status: 200 }
    );
}