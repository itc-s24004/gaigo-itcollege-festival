"use client";

import { api_uploadBlob } from "@/app/api/blob/upload/client";
import { PlainForm } from "@/page_components/form/plain";
import { ImageListView } from "@/page_components/tool/image_view";
import { useState } from "react";

export default function Page() {
    const [images, setImages] = useState<string[]>([]);

    const [canSubmit, setCanSubmit] = useState(true);

    return (
        <div>
            <h1>upload</h1>

            <PlainForm title="画像をアップロード" 
                inputs={
                    [
                        {
                            label: "画像ファイルを選択",
                            type: "input",
                            attr: {
                                type: "file",
                                name: "file",
                                accept: "image/*",
                                required: true,
                                multiple: true,
                                onChange: (ev) => {
                                    if (ev.target.files) setImages([...ev.target.files].map(file => URL.createObjectURL(file)));
                                }
                            }
                        },
                        { node: <ImageListView imageUrls={images} size={200} customAttributes={{style: {maxHeight: 300, width: "100%", overflowY: "scroll"}}}/> }
                    ]
                }
                submitLabel="アップロード"
                submitCallback={ async (formData) => {
                    setCanSubmit(false);

                    const response = await api_uploadBlob(formData);
                    console.log(response);
                    setImages([]);

                    setCanSubmit(true);
                }}
            />
        </div>
    );
}