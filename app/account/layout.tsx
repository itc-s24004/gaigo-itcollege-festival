import { db_getSiteSettings, db_siteSettingsToJson } from "@/libs/db/site_settings";
import RootLayout from "@/page_components/_layout/layout";
import { SITE_SETTINGS } from "@/site_settings";

export const metadata = {
    title: "アカウント管理",
    description: "ユーザーアカウントの管理ページ",
};


export default async function Layout({ children }: { children: React.ReactNode }) {
    const settings = await db_getSiteSettings();
    const site_settings = db_siteSettingsToJson<SITE_SETTINGS>(settings);
    return(
        <RootLayout params={Promise.resolve({festival_id: site_settings.festival})}>
            {children}
        </RootLayout>
    );
}