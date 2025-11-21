import { checkApiPermission } from "@/libs/api_permission";
import { db_user_level } from "@/libs/db/db.type";
import { db_setSiteSetting } from "@/libs/db/site_settings";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";


export async function PUT(req: Request) {
    const user = (await getUserInfo()).user;

    return checkApiPermission( async () => {
        
        const form = await req.formData();
        const key = form.get("key") as string;
        const value = form.get("value") as string | number | boolean | null;

        if (value === null) return NextResponse.json({ message: "Invalid value" }, { status: 400 });

        const ok = await db_setSiteSetting(key, value);

        if (!ok) return NextResponse.json({ message: "Failed to update site setting" }, { status: 500 });

        return NextResponse.json({ message: "Site setting updated successfully" }, { status: 200 });
    }, false, user, db_user_level.admin);
}