import { ApiResponse } from "./route";

export async function api_form_updateEventItem(form: FormData) {
    if (window === undefined) return null;

    const url = new URL(`/api/festival/event/item/update`, window.location.origin);

    const result = await fetch(url, {
        method: "PUT",
        body: form
    })
    .then(async res => res.ok ? await res.json() as ApiResponse : null)
    .catch(() => null);

    return result;
}