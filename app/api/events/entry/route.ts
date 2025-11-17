import { checkApiPermission } from "@/libs/api_permission";
import { db_festival_id, db_event_type } from "@/libs/db/db.type";
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
        const image = form.get("image") as string | null;

        if (!festival_id || !type || !name || !description) return NextResponse.json(
            {
                message: "Missing required fields."
            },
            { status: 400 }
        );

        db_addEvent(festival_id, user!.id, type, name, description, image ?? undefined);

        return NextResponse.json(
            {
                message: "Event entry submitted successfully."
            },
            { status: 200 }
        );

    }, true, user);

}