"use client";

import { useState } from "react";
import { SelectView } from "../select_view";
import Image from "next/image";
import { api_getUserContents } from "@/app/api/user_contents/list/client";
import { db_user_content } from "@/libs/db/db.type";

type Options = {
    multiple?: boolean;
    onSelect?: (contents: db_user_content[]) => void;
}

export function UserContentsView({ multiple = false, onSelect }: Options) {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);


    const [contents, setContents] = useState<db_user_content[]>([]);
    const [moreImage, setMoreImage] = useState<boolean>(true);

    const [isloading, setIsLoading] = useState<boolean>(false);
    
    async function getMoreImages() {
        if (!moreImage || isloading) return;
        setIsLoading(true);
        const result = await api_getUserContents("image", 20, contents.length);

        setContents(contents.concat(result));

        setMoreImage(result.length == 20);
        setIsLoading(false);// 終了
    }
    if (firstLoad) {
        setFirstLoad(false);
        getMoreImages();

    }
    

    const [selectedImages, setSelectedImages] = useState<number[]>([]);
    return (
        <div>

            <SelectView
                options={
                    contents.map((content, i) => ({
                        element: (
                            <Image src={content.url} alt={""} width={100} height={100} />
                        )
                    }))
                }
                onSelect={
                    (i) => {
                        const newSelectedImages = [...selectedImages];
                        if (multiple) {
                            if (newSelectedImages.includes(i)) {
                                newSelectedImages.splice(newSelectedImages.indexOf(i), 1);
                            } else {
                                newSelectedImages.push(i);
                            }
                        } else {
                            if (newSelectedImages.includes(i)) {
                                newSelectedImages.splice(0, newSelectedImages.length);
                            } else {
                                newSelectedImages.splice(0, newSelectedImages.length, i);
                            }
                        }
                        setSelectedImages(newSelectedImages);
                        if (onSelect) onSelect(newSelectedImages.map(index => contents[index]));
                    }
                }
                selected={selectedImages}
            />

            <button disabled={!moreImage || isloading} onClick={getMoreImages}>
                {isloading ? "読み込み中..." : moreImage ? "もっと画像を読み込む" : "これ以上画像はありません"}
            </button>
        </div>
    );
}