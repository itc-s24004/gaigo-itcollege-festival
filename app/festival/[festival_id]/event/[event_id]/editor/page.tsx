import { db_event_id, db_festival_id } from "@/libs/db/db.type";
import { checkPagePermission } from "@/libs/page_permission";
import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";
import { db_getFestivalWithImageByID } from "@/libs/db/festivals";
import { ErrorContent } from "@/page_components/error";
import { db_getEventWithImageByID } from "@/libs/db/events";
import { db_getEventUsersByEventID } from "@/libs/db/event_users";
import { db_getUserContentByID } from "@/libs/db/user_contents";

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

        const event_image = event.image_id ? await db_getUserContentByID(event.image_id) : null;

        // 管理者権限がある場合はそのまま表示
        if (user!.isAdmin || user!.isSuperAdmin) return <PageContent event_image={event_image ?? undefined} event={event} />;

        const event_users = await db_getEventUsersByEventID(event_id);

        // イベントのオーナーまたは参加者である場合表示
        if ([event.owner_id, ...event_users.map(eu => eu.user_id)].includes(user!.id)) return <PageContent event_image={event_image ?? undefined} event={event} />;
        
        // 権限がない場合エラー表示
        return <ErrorContent title="" message="" />;
    }, true, user)
}

//!!! 作成中