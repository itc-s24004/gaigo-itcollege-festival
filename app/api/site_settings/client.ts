"use client";

export async function api_setSiteSettings(key: string, value: string | number | boolean): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const url = new URL("/api/site_settings", window.location.origin);
    const form = new FormData();
    form.append(key, value.toString());

    return await fetch(url, {
        method: "POST",
        body: form
    })
    .then((res) => res.ok)
    .catch((err) => false);
}