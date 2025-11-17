import { checkApiPermission } from "@/libs/api_permission";
import { db_getUserContentsCount } from "@/libs/db/user_contents";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const user = (await getUserInfo()).user;

    checkApiPermission(async () => {
        const count = db_getUserContentsCount(user!.id);
        return NextResponse.json({ count });
    }, true, user);
}