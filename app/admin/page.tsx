import { db_getFestivalsWithImage } from "@/libs/db/festivals";
import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";
import { db_getSiteSettings, db_siteSettingsToJson } from "@/libs/db/site_settings";
import { checkPagePermission } from "@/libs/page_permission";
import { db_user_level } from "@/libs/db/db.type";

export default async function Page() {
    const user = (await getUserInfo()).user;


    return await checkPagePermission( async () => {
        const settings = await db_getSiteSettings();
        const festivals = await db_getFestivalsWithImage();
        const siteSettings = db_siteSettingsToJson(settings);
        return <PageContent settings={siteSettings} festivals={festivals} />;

    }, false, user, db_user_level.admin);
}