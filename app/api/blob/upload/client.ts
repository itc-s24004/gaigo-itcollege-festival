import { PutBlobResult } from "@vercel/blob";

export async function api_uploadBlob(data: File | FormData) {
    const url = new URL('/api/blob/upload', location.origin);
    
    if (data instanceof File) {
        const formData = new FormData();
        formData.append('file', data, data.name);
        return await (await fetch(url, {method: "POST", body: formData})).json() as PutBlobResult;

    } else {
        return await (await fetch(url, {method: "POST", body: data})).json() as PutBlobResult;

    }

}