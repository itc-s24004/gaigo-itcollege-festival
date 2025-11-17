"use client";

import { api_createFestival } from "@/app/api/festival/create/client";
import { db_user_content } from "@/libs/db/db.type";
import { PlainForm } from "@/page_components/form/plain";
import { UserContentsView } from "@/page_components/tool/user_image_view";
import { redirect } from "next/navigation";
import { useState } from "react";

export function PageContent() {
    const [selectedImage, setSelectedImage] = useState<db_user_content | undefined>(undefined);
    return (
        <PlainForm 
            title="フェスティバルの新規作成"
            inputs={[
                {
                    label: "フェスティバル名",
                    type: "input",
                    attr: {
                        name: "name",
                        type: "text",
                        placeholder: "フェスティバル名を入力してください",
                        minLength: 3,
                        maxLength: 32,
                    }
                },
                {
                    label: "説明",
                    type: "textarea",
                    attr: {
                        name: "description",
                        placeholder: "フェスティバルの説明を入力してください",
                        minLength: 0,
                        maxLength: 256,
                    }
                },
                {
                    type: "custom",
                    node: (
                        <UserContentsView
                            multiple={false}
                            onSelect={(contents) => {
                                setSelectedImage(contents[0]);
                                console.log("選択された画像:", contents);
                            }}
                        />
                    )
                }
            ]}
            submitLabel="作成"
            submitCallback={
                async (form) => {

                    const name = form.get("name") as string;
                    const description = form.get("description") as string;

                    const festival = await api_createFestival(name, description, selectedImage?.id);

                    if (festival) {
                        alert("フェスティバルを作成しました。");
                        redirect(`/${festival[0].id}`);
                    } else {
                        alert("フェスティバルの作成に失敗しました。");
                    }
                }
            }
        />
    );
}