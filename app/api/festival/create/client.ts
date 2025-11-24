import { db_festival, db_user_content_id } from "@/libs/db/db.type";

export async function api_createFestival(name: string, description: string, image_id?: db_user_content_id) {
    if (typeof window === "undefined") return undefined;
    
    const url = new URL(`/api/festival/create`, window.location.origin);
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    if (image_id) form.append("image_id", image_id);

    const result = await fetch(url, {
        method: "POST",
        body: form
    })
    .then(async res => res.ok ? await res.json() as { festival: db_festival[]} : null)
    .catch(() => undefined);

    return result?.festival;
}


export async function api_form_createFestival(form: FormData) {
    if (typeof window === "undefined") return undefined;
    
    const url = new URL(`/api/festival/create`, window.location.origin);

    const result = await fetch(url, {
        method: "POST",
        body: form
    })
    .then(async res => res.ok ? await res.json() as { festival: db_festival[]} : null)
    .catch(() => undefined);

    return result?.festival;
}