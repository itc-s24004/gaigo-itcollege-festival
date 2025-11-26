import { db_event_id, db_festival_id } from "@/libs/db/db.type";
import { checkEventUserPermission } from "@/libs/event_user_permission";
import { checkPagePermission } from "@/libs/page_permission";
import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";
import { ErrorContent } from "@/page_components/error";

type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
        event_id: db_event_id;
    }>;
}


export default async function Page({ params }: PageProps) {
    const user = (await getUserInfo()).user
    

    return checkPagePermission(async () => {
        const { festival_id, event_id } = await params;

        const perm = await checkEventUserPermission(event_id, user!);

        if (perm) return <PageContent festival_id={festival_id} event_id={event_id} />

        return <ErrorContent title="権限がありません" message="このページを表示する権限がありません。" />


    }, true, user);
}