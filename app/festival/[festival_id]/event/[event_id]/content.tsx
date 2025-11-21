import { db_event_with_image } from "@/libs/db/db.data";
import Image from "next/image";

type PageContentProps = {
    event: db_event_with_image;
}

export function PageContent({ event }: PageContentProps) {
    return (
        <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            {event.image_url && <Image src={event.image_url} alt={event.name} width={500} height={300} />}
        </div>
    );
}