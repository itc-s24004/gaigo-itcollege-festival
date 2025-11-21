import type { db_festival_id, db_user_content_id } from "@/libs/db/db.type";
import { FestivalUpdateResponse } from "./route";

export async function api_updateFestival(festivalId: db_festival_id, name: string, description: string, is_archived: boolean, image_id?: db_user_content_id) {
    const formData = new FormData();
    formData.append("festival_id", festivalId);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("is_archived", is_archived ? "true" : "false");
    if (image_id) formData.append("image_id", image_id);

    const response = await fetch("/api/festival/update", {
        method: "PUT",
        body: formData,
    });

    return response.ok ? (await response.json() as FestivalUpdateResponse).festival : null;
}

export async function api_form_updateFestival(formData: FormData) {
    const response = await fetch("/api/festival/update", {
        method: "PUT",
        body: formData,
    });
    
    return response.ok ? (await response.json() as FestivalUpdateResponse).festival : null;
}