"use client";
import { ListBlobResult } from "@vercel/blob";

export async function api_getUserBlob(cursor?: string, dir?: string, limit?: number) {
    const url = new URL('/api/blob/list', location.origin);
    if (cursor) url.searchParams.append('cursor', cursor);
    if (dir) url.searchParams.append('dir', dir);
    if (limit) url.searchParams.append('limit', limit.toString());
    const result: ListBlobResult = await (await fetch(url, {method: "GET"})).json();
    return result;
}