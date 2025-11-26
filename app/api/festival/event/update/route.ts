import { checkApiPermission } from "@/libs/api_permission";
import { db_event_id, db_event_type, db_user_content_id } from "@/libs/db/db.type";
import { db_getEventUsersByEventID } from "@/libs/db/event_users";
import { db_getEventByID, db_updateEvent } from "@/libs/db/events";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const user = (await getUserInfo()).user;
    
    return checkApiPermission(async () => {

        const form = await request.formData();
        const event_id = form.get("event_id") as db_event_id | null;
        const name = form.get("name");
        const description = form.get("description");
        const type = form.get("type") as db_event_type | null;
        const image_id = form.get("image_id") as db_user_content_id | null;

        if (!event_id || !name || !description || !type) return NextResponse.json({ error: "Invalid form data" }, { status: 400 });

        if (typeof event_id !== "string" || typeof name !== "string" || typeof description !== "string" || typeof type !== "string") return NextResponse.json({ error: "Invalid form data types" }, { status: 400 });
        
        const event = await db_getEventByID(event_id);

        if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

        if (user?.isAdmin || user?.isSuperAdmin) {
            const result = await db_updateEvent(event_id, name, description, type, image_id);
            return NextResponse.json({ data: result }, { status: 200 });
        }

        const stuff = await db_getEventUsersByEventID(event_id);

        if ([...stuff, event.owner_id].includes(user!.id)) {
            const result = await db_updateEvent(event_id, name, description, type, image_id);
            return NextResponse.json({ data: result }, { status: 200 });
        }

        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        
    }, true, user);
}