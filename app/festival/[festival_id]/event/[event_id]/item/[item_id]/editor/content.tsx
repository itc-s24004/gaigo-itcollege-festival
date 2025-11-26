"use client";

import { api_form_updateEventItem } from "@/app/api/festival/event/item/update/client";
import { db_event_id, db_event_item, db_festival_id, db_user_content } from "@/libs/db/db.type";
import { PlainForm } from "@/page_components/form/plain";
import { UserImageView } from "@/page_components/tool/user_image_view";
import { useState } from "react";

type PageContentProps = {
    festival_id: db_festival_id;
    event_id: db_event_id;
    item: db_event_item;
    item_image?: db_user_content;
};

export function PageContent({ festival_id, event_id, item, item_image }: PageContentProps) {
    const [selectedImage, setSelectedImage] = useState<db_user_content | undefined>(item_image);
    
    const { uploadScreen, main } = UserImageView(
        {
            canUpload: true,
            scrollView: true,
            defaultSelected: item_image ? [item_image] : [],
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
                            placeholder: "商品名を入力してください",
                            defaultValue: item.name
                        }
                    },
                    {
                        type: "textarea",
                        label: "商品説明",
                        attr: {
                            name: "description",
                            placeholder: "商品説明を入力してください",
                            defaultValue: item.description
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
                            defaultValue: item.price
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

                submitLabel="更新"
                customSubmitButtonAttributes={
                    {
                        disabled: !canSubmit
                    }
                }

                submitCallback={async (form) => {
                    if (selectedImage) form.append("image_id", selectedImage.id);
                    form.append("event_item_id", item.id);

                    setCanSubmit(false);

                    const res = await api_form_updateEventItem(form);
                    alert(res ? "イベント商品を更新しました。" : "イベント商品の更新に失敗しました。");

                    setCanSubmit(true);

                }}
            />
            {
                uploadScreen
            }
        </>
    )
}