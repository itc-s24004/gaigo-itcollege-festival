import { useState } from "react";
import { PlainForm } from "../plain";
import { ImageListView } from "@/page_components/tool/image_view";

type Options = {
    onSubmit?: (formData: FormData) => Promise<void>;
    customFormAttributes?: React.FormHTMLAttributes<HTMLFormElement>;
}
export function Template_Form_ImageUpload({ onSubmit, customFormAttributes }: Options) {
    const [selectedImage, setSelectedImage] = useState<string[]>([]);
    return (
        <PlainForm
            inputs={[
                {
                    label: "画像選択",
                    type: "input",
                    attr: {
                        type: "file",
                        name: "image",
                        accept: "image/*",
                        required: true,
                        onChange: (ev) => {
                            if (ev.target.files) setSelectedImage([...ev.target.files].map(file => URL.createObjectURL(file)));
                        }
                    }
                },
                {
                    type: "custom_input",
                    label: "選択画像プレビュー",
                    node: (
                        <ImageListView imageUrls={selectedImage}/>
                    )
                }
            ]}
            submitLabel="アップロード"
            submitCallback={onSubmit}
            customFormAttributes={customFormAttributes}
        >
        </PlainForm>
    );
}