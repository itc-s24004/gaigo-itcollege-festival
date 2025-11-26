"use client";

import type { db_event } from "@/libs/db/db.type";

export async function api_form_updateEvent(form: FormData) {
    if (typeof window === "undefined") return null;
    
    const url = new URL(`/api/festival/event/update`, window.location.origin);

    const result = await fetch(url, {
        method: "PUT",
        body: form
    })
    .then(async res => res.ok ? await res.json() as { data: db_event[] } : null)
    .catch(() => null);

    return result;
}