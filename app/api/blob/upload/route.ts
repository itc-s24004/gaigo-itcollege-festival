import { getUserInfo } from "@/libs/user";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import path from "path";



export async function POST(req: NextRequest) {
    console.log("Accessing protected blob endpoint");
    const user = (await getUserInfo()).user;
    if (!user || !user.isStaff) {
        return NextResponse.json(
            {
                error: "Unauthorized"
            },
            { status: 401 }
        );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
        return NextResponse.json(
            {
                error: "No file uploaded."
            },
            { status: 400 }
        );
    }
    console.log("Received file:", file);
    const uid = crypto.randomUUID();
    const result = await put(path.join(user.id, uid, file.name), await file.arrayBuffer(), {
        access: "public"
    });
    console.log("File uploaded to blob storage:", result);

    return NextResponse.json(result);
}