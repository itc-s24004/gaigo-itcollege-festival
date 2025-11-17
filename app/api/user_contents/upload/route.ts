import { blob_upload } from "@/libs/blob";
import { db_addUserContent } from "@/libs/db/user_contents";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = (await getUserInfo()).user;

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!user.isStaff && !user.isAdmin && !user.isSuperAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file || !(file instanceof File)) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: "File size exceeds limit" }, { status: 400 });

    const id = crypto.randomUUID();
    const result = await blob_upload(id, file);
    const content = await db_addUserContent(user.id, result.url, file.type);


    return NextResponse.json({ content });
}