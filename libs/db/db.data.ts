import { db_event, db_event_item, db_festival } from "./db.type";


// フェスティバル情報▼
export type db_festival_with_image = {
    image_url?: string;
} & db_festival;



// イベント情報▼
export type db_event_with_image = {
    image_url?: string;
} & db_event;



// 商品情報▼
export type db_event_item_with_image = {
    image_url?: string;
} & db_event_item;