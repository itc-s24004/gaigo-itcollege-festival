import { getAllBlob } from "@/libs/blob";
import { ImageSelectWindow } from "@/page_components/tool/image_select";

export default async function Page() {
    const images = (await getAllBlob()).blobs.map(blob => blob.url);

    async function handleSubmit(selectedImages: string[]) {
        "use server";
        console.log("Selected images:", selectedImages);
    }
    
    return (
        <ImageSelectWindow title="画像選択" imageUrls={images} multiple={true} submitCallback={handleSubmit} />
    );
}