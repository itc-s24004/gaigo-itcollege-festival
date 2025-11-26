"use client";

import { api_form_createEventItem } from "@/app/api/festival/event/item/create/client";
import { db_event_id, db_festival_id, db_user_content } from "@/libs/db/db.type";
import { PlainForm } from "@/page_components/form/plain";
import { UserImageView } from "@/page_components/tool/user_image_view";
import { redirect } from "next/navigation";
import { useState } from "react";

type PageContentProps = {
    festival_id: db_festival_id;
    event_id: db_event_id;
};

export function PageContent({ festival_id, event_id }: PageContentProps) {
    const [selectedImage, setSelectedImage] = useState<db_user_content | undefined>();
    
    const { uploadScreen, main } = UserImageView(
        {
            canUpload: true,
            scrollView: true,
            onSelect: (contents) => {
                setSelectedImage(contents[0]);
            }
        }
    );

    const [canSubmit, setCanSubmit] = useState<boolean>(true);
    
    return (
        <>
            <PlainForm
                title="イベント商品作成"
                inputs={[
                    {
                        type: "input",
                        label: "商品名",
                        attr: {
                            type: "text",
                            name: "name",
                            placeholder: "商品名を入力してください"
                        }
                    },
                    {
                        type: "textarea",
                        label: "商品説明",
                        attr: {
                            name: "description",
                            placeholder: "商品説明を入力してください"
                        }
                    },
                    {
                        type: "input",
                        label: "価格",
                        attr: {
                            type: "number",
                            name: "price",
                            placeholder: "価格を入力してください",
                            min: 0,
                            defaultValue: 0,
                        }
                    },
                    {
                        type: "label",
                        label: "商品画像"
                    },
                    {
                        type: "custom",
                        node: main
                    }
                ]}

                submitLabel="作成"
                customSubmitButtonAttributes={
                    {
                        disabled: !canSubmit
                    }
                }

                submitCallback={async (form) => {
                    if (selectedImage) form.append("image_id", selectedImage.id);
                    form.append("event_id", event_id);

                    setCanSubmit(false);

                    const res = await api_form_createEventItem(form);
                    if (res) {
                        alert("イベント商品を作成しました。");
                        redirect(`/festival/${festival_id}/event/${event_id}/editor`);
                    }
                    alert("イベント商品の作成に失敗しました。");

                    setCanSubmit(true);

                }}
            />
            {
                uploadScreen
            }
        </>
    )
}