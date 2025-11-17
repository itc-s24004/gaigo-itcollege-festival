import { del, list, put } from "@vercel/blob"
import { UserAccount } from "./data";
import path from "path";

export function VercelBlob() {

}


export async function getAllBlob() {
    return await list();
}

export async function getUserBlob(userId: string, dir?: string, cursor?: string, limit?: number) {
    if (dir && !path.isAbsolute(dir)) return null;
    return await list({
        prefix: dir ? path.join(userId, dir) : `${userId}/`,
        limit: limit,
        cursor,
    });
}


export async function uploadBlob(user: UserAccount ,data: File) {
    const mime = data.type;
    const uid = crypto.randomUUID();

    const filePath = path.join(user.id, mime, `${uid}_${data.name}`);
    
    const result = await put(filePath, await data.arrayBuffer(), {
        access: "public",
        contentType: mime
    });

    return result;
}


export async function deleteBlob(filePath: string) {
    await del(filePath);
}



export async function blob_upload(id: string, data: File) {
    const mime = data.type;
    const result = await put(id, await data.arrayBuffer(), {
        access: "public",
        contentType: mime
    });
    return result;
}