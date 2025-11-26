import { checkApiPermission } from "@/libs/api_permission";
import { db_event_item, db_event_item_id, db_user_content_id } from "@/libs/db/db.type";
import { db_getEventByID } from "@/libs/db/events";
import { db_getEventItemByID, db_updateEventItem } from "@/libs/db/event_items";
import { checkEventUserPermission } from "@/libs/event_user_permission";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const user = (await getUserInfo()).user;

    return checkApiPermission(async () => {
        const form = await req.formData();
        
        const event_item_id = form.get("event_item_id") as db_event_item_id;
        const name = form.get("name") as string;
        const description = form.get("description") as string;
        const price = parseInt(form.get("price") as string);
        const image_id = form.get("image_id") as db_user_content_id | null;


        console.log({ event_item_id, name, description, price, image_id });

        if (!event_item_id || !name || !description || isNaN(price)) return NextResponse.json({ data: "Invalid input" }, { status: 400 });


        // アイテムとイベントの取得
        const event_item = await db_getEventItemByID(event_item_id);
        if (!event_item) return NextResponse.json({ data: "Event item not found" }, { status: 404 });

        const event = await db_getEventByID(event_item.event_id);
        if (!event) return NextResponse.json({ data: "Event not found" }, { status: 404 });

        // 権限の確認
        const prem = await checkEventUserPermission(event, user!);
        if (!prem) return NextResponse.json({ data: "Permission denied" }, { status: 403 });

        // アイテムの更新
        const item = await db_updateEventItem(event_item_id, name, description, price, image_id ?? undefined);
        if (!item) return NextResponse.json({ data: "Failed to update item" }, { status: 500 });


        return NextResponse.json({ data: item }, { status: 200 });
    }, true, user);
}

export type ApiResponse = {
    data: db_event_item
}