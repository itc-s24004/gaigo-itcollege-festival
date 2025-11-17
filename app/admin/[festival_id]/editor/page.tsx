import { checkPagePermission } from "@/libs/page_permission";
import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";

export default async function Page() {
    const user = (await getUserInfo()).user;
    
    return checkPagePermission(async () => {
        return (
            <PageContent />
        )
    }, true, user)
}

//!!! 作成中