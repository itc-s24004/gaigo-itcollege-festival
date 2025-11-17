import { db_festival_id } from "@/libs/db/db.type";


export type PageProps = {
    [key: string]: *;
}


export type to_prop<T extends PageProps = PageProps> = {
    params: Promise.<{
        [key in keyof T]: T[key];
    }>
}
