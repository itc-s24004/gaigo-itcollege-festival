import { db_event_id, db_festival_id } from "@/libs/db/db.type";
import { db_getEventItemsByEventID } from "@/libs/db/event_items";

type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
        event_id: db_event_id;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { festival_id, event_id } = await params;

    const items = await db_getEventItemsByEventID(event_id);
    return 
}