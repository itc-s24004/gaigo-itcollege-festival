import { db_getArchivedFestivalsWithImage } from "@/libs/db/festivals";
import { PageContent } from "./content";

export default async function Page() {
    const archived_festivals = await db_getArchivedFestivalsWithImage();
    return (
        <PageContent festivals={archived_festivals} />
    );
}