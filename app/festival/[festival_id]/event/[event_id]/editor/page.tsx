import { db_event_id, db_festival_id } from "@/libs/db/db.type";
import { checkPagePermission } from "@/libs/page_permission";
import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";
import { ErrorContent } from "@/page_components/error";
import { db_getEventWithImageByID } from "@/libs/db/events";
import { db_getUserContentByID } from "@/libs/db/user_contents";
import { db_getEventItemWithImageByEventID } from "@/libs/db/event_items";
import { checkEventUserPermission } from "@/libs/event_user_permission";

type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
        event_id: db_event_id;
    }>;
};

export default async function Page({ params }: PageProps) {
    const user = (await getUserInfo()).user;
    const { festival_id, event_id } = await params;
    
    return checkPagePermission(async () => {
        const event = await db_getEventWithImageByID(event_id);

        // イベントが存在しない場合エラー表示
        if (!event) return <ErrorContent title="" message="" />;

        const perm = await checkEventUserPermission(event_id, user!);
        if (!perm) return <ErrorContent />;

        const event_image = event.image_id ? await db_getUserContentByID(event.image_id) : null;
        const items = await db_getEventItemWithImageByEventID(event_id);

        return <PageContent event_image={event_image ?? undefined} event={event} items={items ?? []} />;

    }, true, user)
}

//!!! 作成中