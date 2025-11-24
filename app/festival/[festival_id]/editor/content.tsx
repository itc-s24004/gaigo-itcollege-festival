"use client";

import { api_form_updateFestival } from "@/app/api/festival/update/client";
import { api_setSiteSettings } from "@/app/api/site_settings/client";
import { db_festival_with_image } from "@/libs/db/db.data"
import { db_festival_id, db_user_content } from "@/libs/db/db.type";
import { PlainButton } from "@/page_components/button/plain";
import { MultiForm } from "@/page_components/form/multi_form";
import { PlainForm } from "@/page_components/form/plain";
import { UserImageView } from "@/page_components/tool/user_image_view";
import { useState } from "react";

type PageProps = {
    festival: db_festival_with_image;
    current_festival: db_festival_id;
    festival_image?: db_user_content;
}

export function PageContent({ festival, current_festival, festival_image }: PageProps) {
    const [selectedImage, setSelectedImage] = useState<db_user_content | undefined>(festival_image);
    const [canSubmit, setCanSubmit] = useState<boolean>(true);

    const { main, uploadScreen } = UserImageView(
        {
            defaultSelected: festival_image ? [festival_image] : [],
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
            <MultiForm>
                <PlainForm
                    title="情報編集"
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
                                maxLength: 32,
                                defaultValue: festival.name
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
                                maxLength: 256,
                                defaultValue: festival.description
                            }
                        },
                        {
                            type: "label",
                            label: "画像選択",
                        },
                        {
                            type: "custom",
                            node: main
                        },
                        {
                            type: "input",
                            label: "アーカイブ",
                            attr: {
                                type: "checkbox",
                                name: "is_archived",
                                defaultChecked: festival.is_archived
                            }
                        }
                    ]}
                    submitLabel="保存"
                    submitCallback={async (form) => {
                        setCanSubmit(false)
                        form.append("festival_id", festival.id);
                        if (selectedImage) form.append("image_id", selectedImage.id);
                        const result = await api_form_updateFestival(form);

                        if (result) {
                            alert("フェスティバル情報を更新しました。");
                        } else {
                            alert("フェスティバル情報の更新に失敗しました。");
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
                    festival.id !== current_festival &&
                    <PlainForm
                        submitLabel="トップページに表示"
                        submitCallback={async () => {
                            const result = await api_setSiteSettings("current_festival", festival.id);
                            if (result) {
                                alert("トップページに表示するように更新しました。");
                            } else {
                                alert("更新に失敗しました。");
                            }
                        }}
                    />
                }
                
            </MultiForm>
            {
                uploadScreen
            }
        </>
    )
}