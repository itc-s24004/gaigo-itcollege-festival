// サイト設定情報▼
export enum db_site_setting_type {
    string = "string",
    number = "number",
    boolean = "boolean",
}

export type db_site_setting_id = string & {__brand: "db_site_setting_id"};

export type db_site_setting = {
    id: db_site_setting_id;
    key: number;
    value: string;
    type: db_site_setting_type;
}
// サイト設定情報▲



// ユーザー情報▼
export enum db_user_level {
    observer = "observer",
    user = "user",
    admin = "admin",
    superAdmin = "superAdmin"
}

export type db_user_id = string & {__brand: "db_user_id"};

export type db_user = {
    id: db_user_id;
    level: db_user_level;
    email: string;
    nickname: string;
}
// ユーザー情報▲



// フェスティバル情報▼
export type db_festival_id = string & {__brand: "db_festival_id"};

export type db_festival = {
    id: db_festival_id;
    
    name: string;
    description: string;
    image_id?: db_user_content_id;
    is_archived: boolean;
}
// フェスティバル情報▲



// 出店情報▼
export type db_event_id = string & {__brand: "db_event_id"};

export enum db_event_type {
    experience = "experience",
    food = "food",
    stage = "stage",
}

export type db_event = {
    id: db_event_id;
    festival_id: db_festival_id;
    owner_id: db_user_id;
    type: db_event_type;

    name: string;
    description: string;
    image_id?: db_user_content_id;
}
// 出店情報▲



// 商品情報▼
export type db_event_item_id = string & {__brand: "db_event_item_id"};

export type db_event_item = {
    id: db_event_item_id;
    event_id: db_event_id;

    name: string;
    description: string;
    image_id?: db_user_content_id;
    price?: number;
}
// 商品情報▲



// 出店担当者情報▼
export type db_event_user = {
    event_id: db_event_id;
    user_id: db_user_id;
}
// 出店担当者情報▲



// ユーザーコンテンツ▼
export type db_user_content_id = string & {__brand: "db_user_content_id"};

export type db_user_content = {
    id: db_user_content_id;
    owner_id: db_user_id;

    url: string;
    type: string;
}
// ユーザーコンテンツ▲