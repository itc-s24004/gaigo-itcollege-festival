import { db_festival_id } from "@/libs/db/db.type";
import { PageContent } from "./content";
import { db_getFestivalByID } from "@/libs/db/festivals";
import { ErrorContent } from "@/page_components/error";
import { db_getEventsWithImageByFestivalID } from "@/libs/db/events";
import { getUserInfo } from "@/libs/user";


type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
    }>;
};
export default async function Page({ params }: PageProps) {
    const { festival_id } = await params;
    const festival = await db_getFestivalByID(festival_id);

    if (!festival) return <ErrorContent title="お探しのページは見つかりませんでした" message={""}  />

    const user = (await getUserInfo()).user;

    const events = await db_getEventsWithImageByFestivalID(festival_id);

    return (
        <PageContent events={events} showEntryPage={(user?.isStaff && !festival.is_archived) ?? false} />

    );
}