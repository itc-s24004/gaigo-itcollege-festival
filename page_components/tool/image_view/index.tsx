import Image from "next/image";
import styles from "./index.module.css";

type Options = {
    imageUrls: string[];
    onImageSelect?: (url: string) => void;

    size?: number;

    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
}
export function ImageListView({ imageUrls, onImageSelect, size = 400, customAttributes }: Options) {
    return (
        <div className={styles.image_container} {...customAttributes}>
            {
                imageUrls.map((url, index) => (
                    <div className={styles.image_wapper} key={index}>
                        <Image src={url} alt="Image" width={size} height={size} onClick={() => {
                            onImageSelect?.(url);
                        }} />
                    </div>
                ))
            }
        </div>
    );
}