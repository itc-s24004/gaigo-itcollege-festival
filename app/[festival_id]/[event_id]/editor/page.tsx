import { db_event_id, db_festival_id } from "@/libs/db/db.type";

type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
        event_id: db_event_id;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { festival_id, event_id } = await params;
    return (
        <div>
            <h1>Editor Page</h1>
        </div>
    )
}

//!!! 作成中