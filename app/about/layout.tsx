import { db_getSiteSettings, db_siteSettingsToJson } from "@/libs/db/site_settings";
import RootLayout from "@/page_components/_layout/layout";
import { SITE_SETTINGS } from "@/site_settings";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const setting = await db_getSiteSettings();
    const site_settings = db_siteSettingsToJson<SITE_SETTINGS>(setting);
    
    return (
        <RootLayout params={ Promise.resolve({festival_id: site_settings.current_festival}) } >
            {children}
        </RootLayout>
    )
}