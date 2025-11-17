"use client";

import { db_festival_id, db_event_type } from "@/libs/db/db.type";


export async function api_addShop(festival_id: db_festival_id, name: string, description: string, type: db_event_type, image?: string): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const url = new URL(`/api/events/entry`, window.location.origin);
    
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("festival_id", festival_id.toString());
    form.append("type", type);
    if (image) form.append("image", image);

    return await fetch(url, {
        method: "POST",
        body: form
    })
    .then(res => res.ok)
    .catch(() => false);
}