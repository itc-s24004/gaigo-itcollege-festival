import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";
import { checkPagePermission } from "@/libs/page_permission";
import { db_getFestivalWithImageByID } from "@/libs/db/festivals";
import { db_festival_id } from "@/libs/db/db.type";

type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
    }>
}
export default async function Page({ params }: PageProps) {
    const user = (await getUserInfo()).user;
    
    return checkPagePermission( async () => {
        const { festival_id } = await params;
        const festival = await db_getFestivalWithImageByID(festival_id as db_festival_id);
        return (
            <div>
                <PageContent festival={festival ?? undefined} />
            </div>
        )
    }, true, user);
}