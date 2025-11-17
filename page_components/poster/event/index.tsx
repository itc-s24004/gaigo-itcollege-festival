import { db_event_with_image } from "@/libs/db/db.data";
import Image from "next/image";
import styles from "./index.module.css";

type EventPosterProps = {
    data: db_event_with_image;
    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
}

export function EventPoster({ data, customAttributes }: EventPosterProps) {
    return (
        <div className={styles.poster} {...customAttributes}>
            <Image src={data.image_url ?? "/default/image.png"} alt={data.name} width={300} height={170} className={styles.posterImage} />
            <h2 className={styles.posterTitle}>{data.name}</h2>
            <p className={styles.posterDescription}>{data.description}</p>
        </div>
    );
}