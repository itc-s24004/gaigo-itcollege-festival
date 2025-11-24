import { db_event_id, db_festival_id } from "@/libs/db/db.type";
import { db_getEventWithImageByID } from "@/libs/db/events";
import { ErrorContent } from "@/page_components/error";
import { PageContent } from "./content";

type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
        event_id: db_event_id;
    }>;
};

export default async function Page({ params }: PageProps) {
    const event_id = (await params).event_id as db_event_id;
    if (!event_id) return <ErrorContent title={""} message={""} />;

    const data = await db_getEventWithImageByID(event_id);

    if (!data) return <ErrorContent title={"出展が見つかりません"} message={"指定された出展IDの出展は存在しません。"} />;

    return (
        <PageContent event={data} />
    );
}