"use client";

import { site_setting, SITE_SETTINGS } from "@/site_settings";

export async function api_setSiteSettings<T extends site_setting = SITE_SETTINGS, K extends keyof T = keyof T>(key: K, value: T[K]): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const url = new URL("/api/site_settings", window.location.origin);
    const form = new FormData();
    form.append("key", key.toString());
    form.append("value", value.toString());

    return await fetch(url, {
        method: "PUT",
        body: form
    })
    .then((res) => res.ok)
    .catch((err) => false);
}