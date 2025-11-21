"use client";

import { db_user_content } from "@/libs/db/db.type";

export async function api_getUserContents(type?: string, length?: number, offset?: number) {
    if (typeof window === "undefined") return [];
    const url = new URL(`/api/user_contents/list`, window.location.origin);

    if (length !== undefined) url.searchParams.append("limit", length.toString());
    if (offset !== undefined) url.searchParams.append("offset", offset.toString());
    if (type !== undefined) url.searchParams.append("type", type);

    const result = await fetch(url, {
        method: "GET",
    });
    return result.ok ? (await result.json()).contents as db_user_content[] : [];
}