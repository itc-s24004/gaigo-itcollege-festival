"use client";

import { api_getUserBlob } from "@/app/api/blob/list/client";
import { ImageListView } from "@/page_components/tool/image_view";
import { get } from "http";
import { useState } from "react";


export function PageContent() {
    const [images, setImages] = useState<string[]>([]);
    const [moreImage, setMoreImage] = useState<boolean>(true);

    const [cursor, setCursor] = useState<string | undefined>(undefined);

    async function getMoreImages() {
        console.log("Get more images");
        if (!moreImage) return;
        const result = await api_getUserBlob(cursor, 20);
        console.log(result)
        setImages(images.concat(result.blobs.map(blob => blob.url)));
        setMoreImage(result.hasMore);
        setCursor(result.cursor);
    }
    getMoreImages();
    return (
        <div>
            <h1>Account Contents</h1>
            <ImageListView imageUrls={images} />
            <button disabled={!moreImage} onClick={getMoreImages}>
                {moreImage ? "もっと画像を読み込む" : "これ以上画像はありません"}
            </button>
        </div>
    )
}