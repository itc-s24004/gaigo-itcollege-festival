import { checkApiPermission } from "@/libs/api_permission";
import { db_festival, db_festival_id, db_user_content_id, db_user_level } from "@/libs/db/db.type";
import { db_updateFestival } from "@/libs/db/festivals";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const user = (await getUserInfo()).user;

    return checkApiPermission(async () => {
        const form = await request.formData();
        const festival_id = form.get("festival_id") as db_festival_id | undefined;
        const name = form.get("name");
        const description = form.get("description");
        const image_id = form.get("image_id") as db_user_content_id | undefined;
        const is_archived = form.get("is_archived") === "true";

        if (typeof festival_id !== "string" || typeof name !== "string" || typeof description !== "string") return NextResponse.json({ error: "Bad Request" }, { status: 400 });

        const result = await db_updateFestival(festival_id, name, description, is_archived, image_id)
        return NextResponse.json({ success: true, festival: result[0] }, { status: 200 });


    }, false, user, db_user_level.admin)
}

export type FestivalUpdateResponse = {
    success: boolean;
    festival: db_festival
}