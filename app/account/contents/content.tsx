"use client";

import { api_getUserContents } from "@/app/api/user_contents/list/client";
import { PlainButton } from "@/page_components/button/plain";
import { ImageListView } from "@/page_components/tool/image_view";
import { useState } from "react";


export function PageContent() {
    const [images, setImages] = useState<string[]>([]);
    const [moreImage, setMoreImage] = useState<boolean>(true);

    async function getMoreImages() {
        if (!moreImage) return;
        setMoreImage(false);

        const r = await api_getUserContents("image", 20, images.length);
        images.push(...r.map(content => content.url));
        setImages([...images]);
        setMoreImage(r.length == 20);
    }
    getMoreImages();

    return (
        <div>
            <h1>Account Contents</h1>
            <ImageListView imageUrls={images} />
            <PlainButton
                attributes={
                    {
                        disabled: !moreImage,
                        onClick: getMoreImages
                    }
                }
            >
                {moreImage ? "もっと画像を読み込む" : "これ以上画像はありません"}
            </PlainButton>
        </div>
    );
}