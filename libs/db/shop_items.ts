"use server";

import { sql } from "./db";
import { db_event_id, db_event_item, db_event_item_id } from "./db.type";

export async function db_addShopItem(event_id: db_event_id, name: string, description: string, image?: string, price?: number) {
    const data = await sql.query("INSERT INTO event_items (event_id, name, description, image, price) VALUES ($1, $2, $3, $4, $5) RETURNING id", [event_id, name, description, image, price]);
    return data[0].id;
}


export async function db_getShopItems() {
    const data = await sql.query("SELECT * FROM event_items");
    return data;    
}


export async function db_getShopItemByID(shopItemId: db_event_item_id) {
    const data = await sql.query("SELECT * FROM event_items WHERE id = $1", [shopItemId]) as db_event_item[];
    return data.length > 0 ? data[0] : null;
}


export async function db_getShopItemsByShopID(shopId: db_event_id) {
    const data = await sql.query("SELECT * FROM event_items WHERE shop_id = $1", [shopId]) as db_event_item[];
    return data;    
}