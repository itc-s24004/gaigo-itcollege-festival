import { getUserBlob } from "@/libs/blob";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const user = (await getUserInfo()).user;
    
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const dir = url.searchParams.get("dir");
    const cursor = url.searchParams.get("cursor");
    const limit = Math.max(
        1,
        Math.min(Number.parseInt(url.searchParams.get("limit") ?? "20", 10),
        50
    ));

    const result = await getUserBlob(user.id, dir ?? undefined, cursor ?? undefined, limit);
    return NextResponse.json(result);
}