"use client";

import { PlainForm } from "@/page_components/form/plain";

export function PageContent() {
    return (

        <div>
            <PlainForm
                title="出店 フォーム"
                inputs={
                    [
                        {
                            label: "店名",
                            type: "input",
                            attr: {
                                type: "text",
                                name: "name",
                                required: true,
                            }
                        },
                        {
                            label: "お店の説明",
                            type: "textarea",
                            attr: {
                                name: "descriptions",
                                required: true,
                            }
                        }
                    ]
                }
                submitLabel="送信"
                customFormAttributes={
                    {
                        action: "/api/test",
                        method: "post",
                        children: (
                            <h1>出店情報を送信しました</h1>
                        )
                    }
                } >
            </PlainForm>
        </div>
    )
}