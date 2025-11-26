import { ApiResponse } from "./route";

export async function api_form_createEventItem(form: FormData) {
    if (window === undefined) return null;

    const url = new URL(`/api/festival/event/item/create`, window.location.origin);

    const result = await fetch(url, {
        method: "POST",
        body: form
    })
    .then(async res => res.ok ? await res.json() as ApiResponse : null)
    .catch(() => null);


    return result;
}