import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";
import { ErrorContent } from "@/page_components/error";
import { db_festival_id } from "@/libs/db/db.type";

type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
    }>;
}
export default async function Page({ params }: PageProps) {
    const user = (await getUserInfo()).user;

    if (!user || !user.isStaff) return <ErrorContent title="アクセス権限がありません" message="" /> 

    const festival_id = (await params).festival_id as db_festival_id;
    return (
        <PageContent festival_id={festival_id} />
    );
}