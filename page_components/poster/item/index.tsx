import { db_event_item_with_image } from "@/libs/db/db.data"
import { Poster } from "..";

import styles from "../index.module.css";
import Image from "next/image";

type Options = {
    data: db_event_item_with_image;
    link?: string;


    showImage?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
}
export function ItemPoster({ data, link, showImage=true, showTitle=true, showDescription=true }: Options) {
    return (
        <Poster link={link}>
                {showImage && <Image className={styles.posterImage} src={data.image_url ?? "/default/image.png"} alt={data.name} width={1000} height={600} />}
                {showTitle && <h2 className={styles.posterTitle}>{data.name} {data.price ? `¥${data.price}` : ""}</h2>}
                {showDescription && <p className={styles.posterDescription}>{data.description}</p>}
        </Poster>
    )
}