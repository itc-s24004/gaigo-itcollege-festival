import { db_user_level } from "@/libs/db/db.type";
import { checkPagePermission } from "@/libs/page_permission";
import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";

type PageProps = {
    params: Promise<{
        account_id: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const user = (await getUserInfo()).user;
    

    return checkPagePermission(async () => {
        const account_id = (await params).account_id;

        

        return <PageContent />
    }, false, user, db_user_level.admin);
}