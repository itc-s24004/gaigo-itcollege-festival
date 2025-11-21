import { db_getUserContents } from "@/libs/db/user_contents";
import { getUserInfo } from "@/libs/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = (await getUserInfo()).user;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!user.isStaff && !user.isAdmin && !user.isSuperAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const searchParams = req.nextUrl.searchParams
    
    const raw_limit = searchParams.get("limit");
    const raw_offset = searchParams.get("offset");
    const type = searchParams.get("type");

    const limit = raw_limit ? Math.min(20, Math.max(parseInt(raw_limit), 1)) : 5;
    const offset = raw_offset ? Math.max(parseInt(raw_offset), 0) : 0;


    console.log(raw_limit, raw_offset, type, limit, offset);

    const contents = await db_getUserContents(user.id, type ?? undefined, limit, offset);

    return NextResponse.json({ contents });
}