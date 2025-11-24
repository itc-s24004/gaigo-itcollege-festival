import { db_event_with_image } from "@/libs/db/db.data";
import Image from "next/image";

import styles from "./page.module.css";

type PageContentProps = {
    event: db_event_with_image;
    // eventItems?:
}

export function PageContent({ event }: PageContentProps) {
    return (
        <div>
            
            <div className={styles.topContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{event.name}</h1>
                    <p className={styles.description}>{event.description}</p>
                </div>
                {event.image_url && <Image src={event.image_url} alt={event.name} width={1920} height={300} className={styles.topImage} />}
            </div>


            <div>

            </div>

        </div>
    );
}