import { checkApiPermission } from "@/libs/api_permission";
import { db_event_id, db_event_item, db_user_content_id } from "@/libs/db/db.type";
import { db_addEventItem } from "@/libs/db/event_items";
import { checkEventUserPermission } from "@/libs/event_user_permission";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const user = (await getUserInfo()).user;

    return checkApiPermission(async () => {
        const form = await request.formData();
        
        const event_id = form.get("event_id") as db_event_id;
        const name = form.get("name") as string;
        const description = form.get("description") as string;
        const price = parseInt(form.get("price") as string);
        const image_id = form.get("image_id") as db_user_content_id | null;

        console.log({ event_id, name, description, price, image_id });

        if (!event_id || !name || !description || isNaN(price)) return NextResponse.json({ data: "Invalid input" }, { status: 400 });

        const mrem = checkEventUserPermission(event_id, user!);

        if (!mrem) return NextResponse.json({ data: "Permission denied" }, { status: 403 });

        const items = await db_addEventItem(event_id, name, description, price, image_id ?? undefined);

        if (!items) return NextResponse.json({ data: "Failed to create item" }, { status: 500 });

        return NextResponse.json({ data: items }, { status: 200 });
    }, true, user);
    
}

export type ApiResponse = {
    data: db_event_item[]
}