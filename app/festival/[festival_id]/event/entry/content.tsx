"use client";

import { api_addEvent } from "@/app/api/festival/event/create/client";
import { db_festival_id, db_event_type, db_user_content } from "@/libs/db/db.type";
import { PlainForm } from "@/page_components/form/plain";
import { UserImageView } from "@/page_components/tool/user_image_view";
import { redirect } from "next/navigation";
import { useState } from "react";

type PageContentProps = {
    festival_id: db_festival_id;
}

export function PageContent({ festival_id }: PageContentProps) {
    const [selectedImage, setSelectedImage] = useState<db_user_content | undefined>(undefined);
    const [canSubmit, setCanSubmit] = useState<boolean>(true);

    const { main, uploadScreen } = UserImageView(
        {
            canReload: false,
            canUpload: true,
            onSelect: (contents) => setSelectedImage(contents[0]),
            customViewAttributes: {
                style: {maxHeight: "400px", overflowY: "scroll"}
            }
        }
    );


    return (
        <>
            <PlainForm
                title="イベント登録フォーム"
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
                            required: true
                        }
                    },
                    {
                        label: "イベント名",
                        type: "input",
                        attr: {
                            type: "text",
                            name: "name",
                            placeholder: "イベント名を入力してください",
                            required: true,
                            minLength: 3,
                            maxLength: 32
                        }
                    },
                    {
                        label: "内容",
                        type: "textarea",
                        attr: {
                            name: "description",
                            placeholder: "内容を入力してください",
                            required: true,
                            minLength: 16,
                            maxLength: 256
                        }
                    },
                    {
                        type: "label",
                        label: "イベント画像選択",
                    },
                    {
                        type: "custom",
                        node: (
                            main
                        )
                    }
                ]}
                submitLabel="送信する"
                submitCallback={async (form) => {
                    setCanSubmit(false)
                    const name = form.get("name") as string;
                    const description = form.get("description") as string;
                    const type = form.get("type") as db_event_type;

                    const event = await api_addEvent(festival_id, name, description, type, selectedImage?.id);

                    if (event) {
                        alert("イベント登録が完了しました。");
                        redirect(`/festival/${festival_id}/event/${event[0].id}/editor`);
                    } else {
                        alert("イベント登録に失敗しました。");
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
        
    );
}