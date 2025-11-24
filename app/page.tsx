import { db_getFestivalWithImageByID } from "@/libs/db/festivals";
import { FestivalPoster } from "@/page_components/poster/festival";
import RootLayout from "@/page_components/_layout/layout";
import { db_getSiteSettings, db_siteSettingsToJson } from "@/libs/db/site_settings";
import { SITE_SETTINGS } from "@/site_settings";

import styles from "./page.module.css";

export default async function Home() {
    const site_settings = await db_getSiteSettings();
    const settings = db_siteSettingsToJson<SITE_SETTINGS>(site_settings);
    const festival = await db_getFestivalWithImageByID(settings.current_festival);


    return (
        <RootLayout params={Promise.resolve({festival_id: settings.current_festival})}>
            <div className={styles.container}>
                {
                    festival && <FestivalPoster key={festival.id} data={festival} customAttributes={{style: {margin: "0 auto", border: "none", boxShadow: "none"}}}/>
                }
            </div>
        </RootLayout>
    );
}