import { db_user_level } from "@/libs/db/db.type";
import { checkPagePermission } from "@/libs/page_permission";
import { PageContent } from "./content";
import { getUserInfo } from "@/libs/user";

export default async function Page() {
    const user = (await getUserInfo()).user;
    return checkPagePermission( async () => {
        return <PageContent />;
    }, false, user, db_user_level.admin);
}