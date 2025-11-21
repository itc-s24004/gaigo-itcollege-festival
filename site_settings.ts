import { db_festival_id } from "./libs/db/db.type";

export type site_setting = {
    [key: string]: string | number | boolean;
}


export type SITE_SETTINGS = {
    current_festival: db_festival_id;
}