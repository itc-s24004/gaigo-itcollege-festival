import { db_getArchivedFestivals } from "@/libs/db/festivals";
import { PageContent } from "./content";

export default async function Page() {
    const archived_festivals = await db_getArchivedFestivals();
    return (
        <PageContent festivals={archived_festivals} />
    );
}