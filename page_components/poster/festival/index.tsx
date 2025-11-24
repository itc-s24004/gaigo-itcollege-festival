import Image from "next/image";

import styles from "./index.module.css";
import { db_festival_with_image } from "@/libs/db/db.data";
import Link from "next/link";

type Options = {
    data: db_festival_with_image;
    customAttributes?: React.HTMLAttributes<HTMLDivElement>;

    showImage?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    link?: string;
}


export function FestivalPoster({ data, customAttributes, link, showImage = true, showTitle = true, showDescription = true }: Options) {
    return link ? (
        <div className={styles.poster} {...customAttributes}>
            <Link href={link}>
                {showTitle && <h2 className={styles.posterTitle}>{data.name}</h2>}
                {showImage && <Image className={styles.posterImage} src={data.image_url ?? "/default/image.png"} alt={data.name} width={1000} height={600} />}
                {showDescription && <p className={styles.posterDescription}>{data.description}</p>}
            </Link>
        </div>
    ) : (
        <div className={styles.poster} {...customAttributes}>
            {showTitle && <h2 className={styles.posterTitle}>{data.name}</h2>}
            {showImage && <Image className={styles.posterImage} src={data.image_url ?? "/default/image.png"} alt={data.name} width={1000} height={600} />}
            {showDescription && <p className={styles.posterDescription}>{data.description}</p>}
        </div>
    );
}