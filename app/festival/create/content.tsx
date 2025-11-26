"use client";


import { api_form_createFestival } from "@/app/api/festival/create/client";
import { db_user_content } from "@/libs/db/db.type";
import { PlainForm } from "@/page_components/form/plain";
import { UserImageView } from "@/page_components/tool/user_image_view";
import { redirect } from "next/navigation";
import { useState } from "react";

export function PageContent() {
    const [selectedImage, setSelectedImage] = useState<db_user_content | undefined>();
    const [canSubmit, setCanSubmit] = useState<boolean>(true);

    const { main, uploadScreen } = UserImageView(
        {
            canReload: false,
            canUpload: true,
            scrollView: true,
            onSelect: (contents) => setSelectedImage(contents[0]),
        }
    );
    return (
        <>
            <PlainForm
                title="新しい祭りを作成"
                inputs={[
                    {
                        label: "タイトル",
                        type: "input",
                        attr: {
                            type: "text",
                            name: "name",
                            placeholder: "タイトルを入力してください",
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
                            placeholder: "説明を入力してください",
                            required: true,
                            minLength: 16,
                            maxLength: 256
                        }
                    },
                    {
                        type: "label",
                        label: "画像選択",
                    },
                    {
                        type: "custom",
                        node: main
                    }
                ]}
                submitLabel="作成"
                submitCallback={async (form) => {
                    setCanSubmit(false)
                    if (selectedImage) form.append("image_id", selectedImage.id);
                    const result = await api_form_createFestival(form);

                    if (result) {
                        redirect(`/festival/${result[0].id}/editor`);
                    } else {
                        alert("祭りの作成に失敗しました。");
                    }
                    setCanSubmit(true);

                }}
                customSubmitButtonAttributes={
                    {
                        disabled: !canSubmit
                    }
                }
            />
            {
                uploadScreen
            }
        </>
    )
}