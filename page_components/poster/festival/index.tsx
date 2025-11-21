import Image from "next/image";

import styles from "./index.module.css";
import { db_festival_with_image } from "@/libs/db/db.data";

type Options = {
    data: db_festival_with_image;
    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
}


export function FestivalPoster({ data, customAttributes }: Options) {
    return (
        <div className={styles.poster} {...customAttributes}>
            <h2 className={styles.posterTitle}>{data.name}</h2>
            <Image className={styles.posterImage} src={data.image_url ?? "/default/image.png"} alt={data.name} width={1000} height={600} />
            <p className={styles.posterDescription}>{data.description}</p>
        </div>
    );
}