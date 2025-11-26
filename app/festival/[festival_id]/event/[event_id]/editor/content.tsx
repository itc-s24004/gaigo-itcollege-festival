"use client";

import { api_form_updateEvent } from "@/app/api/festival/event/update/client";
import { db_event_item_with_image } from "@/libs/db/db.data";
import { db_event, db_event_type, db_user_content } from "@/libs/db/db.type";
import { Carousel } from "@/page_components/carousel";
import { PlainForm } from "@/page_components/form/plain";
import { ItemPoster } from "@/page_components/poster/item";
import { UserImageView } from "@/page_components/tool/user_image_view";
import { useState } from "react";

type PageContentProps = {
    event: db_event;
    event_image?: db_user_content;
    items: db_event_item_with_image[];
}

export function PageContent({ event, event_image, items }: PageContentProps) {
    const [selectedImage, setSelectedImage] = useState<db_user_content | undefined>(event_image);

    const [canSubmit, setCanSubmit] = useState<boolean>(true);
    
    const {main, uploadScreen} = UserImageView(
        {
            multiple: false,
            canUpload: true,
            canReload: true,
            scrollView: true,
            defaultSelected: event_image ? [event_image] : [],
            onSelect: (contents) => {
                setSelectedImage(contents[0]);
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
                        label: "タイプ",
                        type: "select",
                        options: [
                            {
                                label: "体験",
                                value: db_event_type.experience
                            },
                            {
                                label: "飲食",
                                value: db_event_type.food
                            },
                            {
                                label: "ステージ",
                                value: db_event_type.stage
                            }
                        ],
                        attr: {
                            name: "type",
                            placeholder: "タイプを選択してください",
                            required: true,
                            defaultValue: event.type
                        }
                    },
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
                    formData.append("event_id", event.id);
                    if (selectedImage) formData.append("image_id", selectedImage.id);

                    setCanSubmit(false);

                    const res = await api_form_updateEvent(formData);
                    if (res) {
                        alert("イベント情報を更新しました。");
                    } else {
                        alert("イベント情報の更新に失敗しました。");
                    }
                    setCanSubmit(true);
                    
                }}
                customSubmitButtonAttributes={{
                    disabled: !canSubmit
                }}
            />
            {uploadScreen}
            <Carousel 
                title="イベント商品一覧"
                items={
                    items.map((item, index) => <ItemPoster key={index} data={item} link={`/festival/${event.festival_id}/event/${event.id}/item/${item.id}/editor`} />)
                }
                moreLabel="商品を追加"
                moreLink={`/festival/${event.festival_id}/event/${event.id}/item/create`}
            />
        </div>
    )
}