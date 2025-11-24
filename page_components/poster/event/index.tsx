import { db_event_with_image } from "@/libs/db/db.data";
import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";

type EventPosterProps = {
    data: db_event_with_image;
    customAttributes?: React.HTMLAttributes<HTMLDivElement>;

    showImage?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    link?: string;
}

export function EventPoster({ data, customAttributes, showImage = true, showTitle = true, showDescription = true, link }: EventPosterProps) {
    return (
        link ? (
            <Link href={link}>
                <div className={styles.poster} {...customAttributes}>
                    {showImage && <Image src={data.image_url ?? "/default/image.png"} alt={data.name} width={300} height={300} className={styles.posterImage} />}
                    {showTitle && <h2 className={styles.posterTitle}>{data.name}</h2>}
                    {showDescription && <p className={styles.posterDescription}>{data.description}</p>}
                </div>
            </Link>
        ) : (
            <div className={styles.poster} {...customAttributes}>
                {showImage && <Image src={data.image_url ?? "/default/image.png"} alt={data.name} width={300} height={300} className={styles.posterImage} />}
                {showTitle && <h2 className={styles.posterTitle}>{data.name}</h2>}
                {showDescription && <p className={styles.posterDescription}>{data.description}</p>}
            </div>
        )

    );
}