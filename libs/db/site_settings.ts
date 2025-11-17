import { site_setting } from "@/site_settings";
import { sql } from "./db";
import { db_site_setting } from "./db.type";

export async function db_getSiteSettings() {
    const data = await sql.query("SELECT * FROM site_settings") as db_site_setting[];
    return data;
}


export async function db_setSiteSetting(key: string, value: string | number | boolean) {
    const type = typeof value;
    if (type !== "string" && type !== "number" && type !== "boolean") return false;

    value = value.toString();

    const data = await sql.query("INSERT INTO site_settings (key, value, type) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET value = $2, type = $3", [key, value, type]);
    return true;
}



export function db_siteSettingsToJson<T extends site_setting>(settings: db_site_setting[]) {
    const result: {[key: string]: string | number | boolean} = {};
    settings.forEach((setting) => {
        switch (setting.type) {
            case "string":
                result[setting.key] = setting.value;
                break;
            case "number":
                result[setting.key] = Number(setting.value);
                break;
            case "boolean":
                result[setting.key] = setting.value === "true";
                break;
            default:
                result[setting.key] = setting.value;
        }
    });
    return result as T;
}