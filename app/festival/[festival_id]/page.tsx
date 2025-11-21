import { db_festival_id } from "@/libs/db/db.type";
import { db_getFestivalWithImageByID } from "@/libs/db/festivals";
import { PageContent } from "./content";
import { ErrorContent } from "@/page_components/error";

type PageProps = {
    params: Promise<{
        festival_id: db_festival_id;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { festival_id } = await params;
    const festival = await db_getFestivalWithImageByID(festival_id);


    return (
        festival ? (
            <PageContent festival={festival} />
        ) : (
            <ErrorContent title="お探しのページは見つかりませんでした" message={""}  />
        )
    );
}