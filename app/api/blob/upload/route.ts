import { uploadBlob } from "@/libs/blob";
import { getUserInfo } from "@/libs/user";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
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

    const result = await uploadBlob(user, file);

    return NextResponse.json(result);
}