import { db_user_level } from "@/libs/db/db.type";
import { checkPagePermission } from "@/libs/page_permission";
import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";

export default async function Page() {
    const user = (await getUserInfo()).user;


    return checkPagePermission( async () => {
        return <PageContent />;
    }, false, user, db_user_level.admin);
}