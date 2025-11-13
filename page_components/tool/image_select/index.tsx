"use client";


import { SubmitButton } from "@/page_components/form/button";
import Image from "next/image";
import { useState } from "react";

type Options = {
    title: string;
    submitLabel?: string;
    imageUrls: string[];
    multiple?: boolean;
    maxSelect?: number;
    submitCallback: (selectedImages: string[]) => void;
}


export function ImageSelectWindow({ title, submitLabel = "送信", imageUrls, multiple = false, maxSelect = Infinity, submitCallback }: Options) {
    // 空文字と重複を除去
    imageUrls = [...new Set(imageUrls.filter(url => url))];
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    function selectImage(url: string) {
        if (multiple) {
            if (selectedImages.includes(url)) {
                setSelectedImages(selectedImages.filter(img => img !== url));

            } else {
                if (selectedImages.length < maxSelect) setSelectedImages([...selectedImages, url]);

            }

        } else {
            setSelectedImages([url]);

        }
    }

    return (
        <div>
            <h2>{title}</h2>
            <div>
                {
                    imageUrls.map((url) => (
                        <Image key={url} src={url} alt="Selectable" width={100} height={100} style={{ margin: '5px', cursor: 'pointer', outline: selectedImages.includes(url) ? '2px solid blue' : 'none' }} onClick={() => {
                            selectImage(url);
                        }} />
                    ))
                }
            </div>
            <SubmitButton label={submitLabel} onClick={() => {
                submitCallback(selectedImages);
                setSelectedImages([]);
            }} />
        </div>
    );
}