"use client";

import { db_event, db_user_content } from "@/libs/db/db.type";
import { PlainForm } from "@/page_components/form/plain";
import { UserImageView } from "@/page_components/tool/user_image_view";
import { useState } from "react";

type PageContentProps = {
    event: db_event;
    event_image?: db_user_content;
}

export function PageContent({ event, event_image }: PageContentProps) {
    const [selectedImage, setSelectedImage] = useState<db_user_content | undefined>(event_image);
    
    const {main, uploadScreen} = UserImageView(
        {
            multiple: false,
            canUpload: true,
            canReload: true,
            defaultSelected: event_image ? [event_image] : [],
            onSelect: (contents) => {
                setSelectedImage(contents[0]);
            },
            customViewAttributes: {
                style: {maxHeight: "400px", overflowY: "scroll"}
            }
        }
    );


    return (
        <div>
            <h1>Editor Page</h1>
            <PlainForm 
                title={`イベント編集: ${event.name}`}
                inputs={[
                    {
                        label: "イベント名",
                        type: "input",
                        attr: {
                            type: "text",
                            name: "name",
                            defaultValue: event.name,
                            required: true,
                            minLength: 3,
                            maxLength: 32
                        }
                    },
                    {
                        label: "説明",
                        type: "textarea",
                        attr: {
                            name: "description",
                            defaultValue: event.description,
                            required: true,
                            minLength: 16,
                            maxLength: 256
                        }
                    },
                    {
                        label: "画像選択",
                        type: "label"
                    },
                    {
                        type: "custom",
                        node: main
                    }

                ]}
                submitLabel="保存"
                submitCallback={async (formData) => {
                    if (selectedImage) formData.append("image_id", selectedImage.id);
                    // !!!apiを作成後実装 変更処理
                    
                }}
            />
            {uploadScreen}
            
        </div>
    )
}