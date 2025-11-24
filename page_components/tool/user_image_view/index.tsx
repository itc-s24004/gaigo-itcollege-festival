"use client";

import { useState } from "react";
import { SelectView } from "../select_view";
import Image from "next/image";
import { api_getUserContents } from "@/app/api/user_contents/list/client";
import { db_user_content } from "@/libs/db/db.type";
import { FillScreen } from "@/page_components/screen/fill";
import { Template_Form_ImageUpload } from "@/page_components/form/template_user_image_upload/imdex";
import { api_uploadUserContent } from "@/app/api/user_contents/upload/client";

import styles from "./index.module.css";
import { PlainButton } from "@/page_components/button/plain";

type Options = {
    defaultSelected?: db_user_content[];
    customOptions?: db_user_content[];
    multiple?: boolean;
    onSelect?: (contents: db_user_content[]) => void;

    canUpload?: boolean;
    canReload?: boolean;

    uploadAction?: () => void;

    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
    customViewAttributes?: React.HTMLAttributes<HTMLDivElement>;
}

export function UserContentsView({ customOptions = [], defaultSelected = [], multiple = false, onSelect, canUpload = false, canReload = false, uploadAction, customAttributes, customViewAttributes }: Options) {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);


    const [uploadedImages, setUploadedImages] = useState<db_user_content[]>([]);// ユーザーがアップロードした画像
    const [loadedImages, setLoadedImages] = useState<db_user_content[]>([]);// 追加で読み込んだ画像

    const allImages = [...defaultSelected, ...customOptions, ...loadedImages];// 全ての画像


    
    const [moreImage, setMoreImage] = useState<boolean>(true);
    const [isloading, setIsLoading] = useState<boolean>(false);
    
    async function getMoreImages() {
        if (!moreImage || isloading) return;
        setIsLoading(true);
        const result = await api_getUserContents("image", 20, allImages.length - defaultSelected.length - customOptions.length - uploadedImages.length);

        setLoadedImages([...loadedImages, ...result]);

        setMoreImage(result.length == 20);
        setIsLoading(false);// 終了
    }
    if (firstLoad) {
        setFirstLoad(false);
        getMoreImages();

    }

    function reload() {
        setUploadedImages([]);
        setLoadedImages([]);
        setMoreImage(true);
        setFirstLoad(true);
    }

    // アップロード画面
    const [upload, setUpload] = useState<boolean>(false);
    

    const [selectedImages, setSelectedImages] = useState<number[]>(defaultSelected ? (multiple ? defaultSelected.map((_, i) => i) : [0]) : []);
    return (
        <div className={styles.user_contents_view_container} {...customAttributes}>

            <SelectView
                options={
                    allImages.map((content) => ({
                        element: (
                            <Image src={content.url} alt={""} width={200} height={200} />
                        )
                    }))
                }
                onSelect={
                    (i) => {
                        const newSelectedImages = [...selectedImages];
                        if (multiple) {
                            if (newSelectedImages.includes(i)) {
                                newSelectedImages.splice(newSelectedImages.indexOf(i), 1);
                            } else {
                                newSelectedImages.push(i);
                            }
                        } else {
                            if (newSelectedImages.includes(i)) {
                                newSelectedImages.splice(0, newSelectedImages.length);
                            } else {
                                newSelectedImages.splice(0, newSelectedImages.length, i);
                            }
                        }
                        setSelectedImages(newSelectedImages);
                        if (onSelect) onSelect(newSelectedImages.map(index => allImages[index]));
                    }
                }
                selected={selectedImages}
                customAttributes={customViewAttributes}
            />

            <div >
                <PlainButton
                    attributes={{
                        disabled: !moreImage || isloading,
                        onClick: getMoreImages
                    }}
                >
                    {isloading ? "読み込み中..." : "もっと画像を読み込む" }
                </PlainButton>
                {
                    canReload &&
                    <button className={styles.action_buttons} type="button" disabled={isloading} onClick={() => reload()}>
                        再読込み
                    </button>
                }
                
                {
                    canUpload &&
                    <button className={styles.action_buttons} type="button"
                        onClick={() => {
                            if (uploadAction) return uploadAction();
                            setUpload(true)
                        }}
                    >
                        画像アップロード
                    </button>
                }
                
            </div>


            {
                canUpload && upload &&
                <FillScreen 
                    customAttributes={{
                        onClick: () => {
                            setUpload(false);
                        }
                    }}>
                    <Template_Form_ImageUpload
                        onSubmit={async (formData) => {
                            const file = formData.get("image") as File;

                            const result = await api_uploadUserContent(file);
                            if (result) {
                                alert("アップロード成功: " + result.content.url);
                                setUploadedImages([...uploadedImages, result.content]);
                                setLoadedImages([...loadedImages, result.content]);
                                setUpload(false);
                            } else {
                                alert("アップロード失敗");
                            }
                        }}
                    />
                </FillScreen>
            }

        </div>
    );
}

















type UserImageViewOptions = {
    defaultSelected?: db_user_content[];
    customOptions?: db_user_content[];
    multiple?: boolean;
    onSelect?: (contents: db_user_content[]) => void;

    canUpload?: boolean;
    canReload?: boolean;


    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
    customViewAttributes?: React.HTMLAttributes<HTMLDivElement>;
}
export function UserImageView( {  customOptions = [], defaultSelected = [], multiple = false, onSelect, canUpload = false, canReload = false, customAttributes, customViewAttributes } : UserImageViewOptions) {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);


    const [uploadedImages, setUploadedImages] = useState<db_user_content[]>([]);// ユーザーがアップロードした画像
    const [loadedImages, setLoadedImages] = useState<db_user_content[]>([]);// 追加で読み込んだ画像

    const allImages = [...defaultSelected, ...customOptions, ...loadedImages];// 全ての画像



    const [moreImage, setMoreImage] = useState<boolean>(true);
    const [isloading, setIsLoading] = useState<boolean>(false);
    
    async function getMoreImages() {
        if (!moreImage || isloading) return;
        setIsLoading(true);
        const result = await api_getUserContents("image", 5, allImages.length - defaultSelected.length - customOptions.length - uploadedImages.length);

        setLoadedImages([...loadedImages, ...result]);

        setMoreImage(result.length == 5);
        setIsLoading(false);// 終了
    }
    if (firstLoad) {
        setFirstLoad(false);
        getMoreImages();

    }

    function reload() {
        setUploadedImages([]);
        setLoadedImages([]);
        setMoreImage(true);
        setFirstLoad(true);
    }

    // アップロード画面
    const [upload, setUpload] = useState<boolean>(false);
    

    const [selectedImages, setSelectedImages] = useState<number[]>(defaultSelected.length ? (multiple ? defaultSelected.map((_, i) => i) : [0]) : []);

    const main = (
        <div className={styles.user_contents_view_container} {...customAttributes}>

            <SelectView
                options={
                    allImages.map((content) => ({
                        element: (
                            <Image src={content.url} alt={""} width={200} height={200} />
                        ),
                    }))
                }
                onSelect={
                    (i) => {
                        const newSelectedImages = [...selectedImages];
                        if (multiple) {
                            if (newSelectedImages.includes(i)) {
                                newSelectedImages.splice(newSelectedImages.indexOf(i), 1);
                            } else {
                                newSelectedImages.push(i);
                            }
                        } else {
                            if (newSelectedImages.includes(i)) {
                                newSelectedImages.splice(0, newSelectedImages.length);
                            } else {
                                newSelectedImages.splice(0, newSelectedImages.length, i);
                            }
                        }
                        setSelectedImages(newSelectedImages);
                        if (onSelect) onSelect(newSelectedImages.map(index => allImages[index]));
                    }
                }
                selected={selectedImages}
                customAttributes={customViewAttributes}
            />

            <div className={styles.action_buttons_container}>
                <PlainButton
                    attributes={{
                        type: "button",
                        disabled: !moreImage || isloading,
                        onClick: getMoreImages
                    }}
                >
                    {isloading ? "読み込み中..." : "もっと画像を読み込む" }
                </PlainButton>
                {
                    canReload &&
                    <PlainButton
                        attributes={{
                            type: "button",
                            disabled: isloading,
                            onClick: () => reload()
                        }}
                    >
                        再読込み
                    </PlainButton>
                }
                
                {
                    canUpload &&
                    <PlainButton
                        attributes={{
                            type: "button",
                            onClick: () => {
                                setUpload(true)
                            }
                        }}
                    >
                        画像アップロード
                    </PlainButton>
                }
                
            </div>

        </div>
    )


    const uploadScreen = (
        canUpload && upload ?
        <FillScreen 
            customAttributes={{
                onClick: () => {
                    setUpload(false);
                }
            }}>
            <Template_Form_ImageUpload
                onSubmit={async (formData) => {
                    const file = formData.get("image") as File;

                    const result = await api_uploadUserContent(file);
                    if (result) {
                        setUploadedImages([...uploadedImages, result.content]);
                        setLoadedImages([...loadedImages, result.content]);
                        setUpload(false);
                    } else {
                        alert("アップロード失敗");
                    }
                }}
                customFormAttributes={
                    {
                        onClick: (ev) => ev.stopPropagation()
                    }
                }
            />
        </FillScreen>
        : null
    )


    return {
        main,
        uploadScreen
    }
}