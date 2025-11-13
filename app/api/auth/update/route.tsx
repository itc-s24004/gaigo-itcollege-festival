import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const userInfo = await getUserInfo();
    const user = userInfo.user;

    if (!user) return new Response("Not logged in.", { status: 401 });

    const form = await req.formData();
    const newNickName = form.get("nickName") as string | null;

    if (!newNickName || newNickName.length < 3 || newNickName.length > 32) return

    return new Response("Nickname updated successfully.", { status: 200 });
}