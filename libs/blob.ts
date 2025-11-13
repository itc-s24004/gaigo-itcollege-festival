import { list } from "@vercel/blob"

export function VercelBlob() {

}


export async function getAllBlob() {
    return await list();
}

export async function getUserBlob(userId: string, cursor?: string, limit?: number) {
   return await list({
        prefix: `${userId}/`,
        limit: limit,
        cursor,
    });
}