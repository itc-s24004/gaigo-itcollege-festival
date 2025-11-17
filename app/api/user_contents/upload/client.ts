import { db_user_content } from "@/libs/db/db.type";

export async function api_uploadUserContent(file: File) {
    if (typeof window === "undefined") return null;

    const url = new URL(`/api/user_contents/upload`, window.location.origin);

    const form = new FormData();
    form.append("file", file);
    
    const result = await fetch(url, {
        method: "POST",
        body: form
    });
    return result.ok ? (await result.json()) as { content: db_user_content} : null;
}