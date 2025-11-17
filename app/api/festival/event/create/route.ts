import { checkApiPermission } from "@/libs/api_permission";
import { db_event_type, db_festival_id, db_user_content_id } from "@/libs/db/db.type";
import { db_addEvent } from "@/libs/db/events";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = (await getUserInfo()).user;

    return checkApiPermission(async () => {

        const form = await req.formData();
        const festival_id = form.get("festival_id") as db_festival_id | null;
        const type = form.get("type") as db_event_type | null;
        const name = form.get("name") as string | null;
        const description = form.get("description") as string | null;
        const image_id = form.get("image_id") as db_user_content_id | null;

        if (!festival_id || !type || !name || !description) return NextResponse.json(
            {
                message: "Missing required fields."
            },
            { status: 400 }
        );

        const event = await db_addEvent(festival_id, user!.id, type, name, description, image_id ?? undefined);
        return NextResponse.json(
            {
                event
            }
        )
    }, true, user);
}