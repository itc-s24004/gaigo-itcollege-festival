import { db_festival_id, db_user_level } from "@/libs/db/db.type";
import { checkPagePermission } from "@/libs/page_permission";
import { getUserInfo } from "@/libs/user"
import { PageContent } from "./content";
import { db_getFestivalByID, db_getFestivalWithImageByID } from "@/libs/db/festivals";
import { ErrorContent } from "@/page_components/error";
import { db_getSiteSettings, db_siteSettingsToJson } from "@/libs/db/site_settings";
import { SITE_SETTINGS } from "@/site_settings";
import { db_getUserContentByID } from "@/libs/db/user_contents";


type PageProps = {
    params: Promise<{
        festival_id: string;
    }>
}
export default async function Page({ params }: PageProps) {
    const user = (await getUserInfo()).user;
    
    return checkPagePermission(async () => {
        const festival_id = (await params).festival_id as db_festival_id;
        const festival = await db_getFestivalWithImageByID(festival_id);

        if (!festival) return <ErrorContent title={"Festival Not Found"} message={`Festival with ID ${festival_id} does not exist.`} />

        const user_content = festival.image_id ? await db_getUserContentByID(festival.image_id) ?? undefined : undefined;

        const site_setting = await db_getSiteSettings();
        const settings = db_siteSettingsToJson<SITE_SETTINGS>(site_setting);

        return <PageContent festival={festival} current_festival={settings.current_festival} festival_image={user_content} />

    }, false, user, db_user_level.admin)
}