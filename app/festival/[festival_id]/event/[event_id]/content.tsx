import { db_event_item_with_image, db_event_with_image } from "@/libs/db/db.data";
import Image from "next/image";

import styles from "./page.module.css";
import { Carousel } from "@/page_components/carousel";
import { ItemPoster } from "@/page_components/poster/item";
import { db_event_type } from "@/libs/db/db.type";

type PageContentProps = {
    event: db_event_with_image;
    items: db_event_item_with_image[];
}

export function PageContent({ event, items: items }: PageContentProps) {
    const itemCarousel = (() => {
        switch (event.type) {
            case db_event_type.experience:
                return (
                    <Carousel
                        title={"体験一覧"}
                        items={
                            items.map((item) => (
                                <ItemPoster
                                    key={item.id}
                                    data={item}
                                />
                            ))
                        }
                    />
                )
            case db_event_type.food:
                return (
                    <Carousel
                        title="メニュー"
                        items={
                            items.map((item) => (
                                <ItemPoster
                                    key={item.id}
                                    data={item}
                                />
                            ))
                        }
                    />
                )
            case db_event_type.stage:
                return (
                    <Carousel
                        title={"出演者一覧"}
                        items={
                            items.map((item) => (
                                <ItemPoster
                                    key={item.id}
                                    data={item}
                                />
                            ))
                        }
                    />
                )
            default:
                return null;
        }
    })();
    
    
    return (
        <div>
            
            <div className={styles.topContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{event.name}</h1>
                    <p className={styles.description}>{event.description}</p>
                </div>
                {event.image_url && <Image src={event.image_url} alt={event.name} width={1920} height={300} className={styles.topImage} />}
            </div>

            {itemCarousel}

        </div>
    );
}