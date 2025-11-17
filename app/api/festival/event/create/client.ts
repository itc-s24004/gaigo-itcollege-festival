"use client";

import { db_event, db_event_type, db_festival_id, db_user_content_id } from "@/libs/db/db.type";

export async function api_addEvent(festival_id: db_festival_id, name: string, description: string, type: db_event_type, image?: db_user_content_id) {
    if (typeof window === "undefined") return null;

    const url = new URL(`/api/festival/event/create`, window.location.origin);
    
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("festival_id", festival_id.toString());
    form.append("type", type);
    if (image) form.append("image_id", image);

    return await fetch(url, {
        method: "POST",
        body: form
    })
    .then(async res => res.ok ? (await res.json()).event as db_event[] : null)
    .catch(() => null);
}