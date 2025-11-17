"use client";

import { api_uploadUserContent } from "@/app/api/user_contents/upload/client";
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
                                multiple: false,
                                onChange: (ev) => {
                                    if (ev.target.files) setImages([...ev.target.files].map(file => URL.createObjectURL(file)));
                                }
                            }
                        },
                        { 
                            type: "custom",
                            node: <ImageListView imageUrls={images} size={200} customAttributes={{style: {maxHeight: 300, width: "100%", overflowY: "scroll"}}}/> },
                        {
                            label: canSubmit ? "アップロード" : "アップロード中...",
                            type: "input",
                            attr: {
                                
                                type: "submit",
                                disabled: !canSubmit,
                            }
                        }
                    ]
                }
                submitCallback={ async (formData) => {
                    setCanSubmit(false);

                    const file = formData.get("file") as File;
                    const result = await api_uploadUserContent(file);

                    if (result) {
                        alert("アップロード成功: " + result.content.url);
                    } else {
                        alert("アップロード失敗");
                    }

                    setImages([]);
                    setCanSubmit(true);
                }}
            />
        </div>
    );
}