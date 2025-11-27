"use server";

import { sql } from "./db";
import { db_event_item_with_image } from "./db.data";
import { db_event_id, db_event_item, db_event_item_id, db_user_content_id } from "./db.type";

export async function db_addEventItem(event_id: db_event_id, name: string, description: string, price: number, image_id?: db_user_content_id) {
    try {
        const data = await sql.query("INSERT INTO event_items (event_id, name, description, price, image_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [event_id, name, description, price, image_id]) as db_event_item[];
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}


export async function db_getEventItems() {
    const data = await sql.query("SELECT * FROM event_items") as db_event_item[];
    return data;    
}


export async function db_getEventItemByID(eventItemId: db_event_item_id) {
    const data = await sql.query("SELECT * FROM event_items WHERE id = $1", [eventItemId]) as db_event_item[];
    return data.length > 0 ? data[0] : null;
}


export async function db_getEventItemsByEventID(eventId: db_event_id) {
    const data = await sql.query("SELECT * FROM event_items WHERE event_id = $1", [eventId]) as db_event_item[];
    return data;
}

export async function db_getEventItemWithImageByEventID(eventId: db_event_id) {
    try {
        const data = await sql.query(`
            SELECT
                event_items.*,
                user_contents.url AS image_url
            
            FROM
                event_items

            LEFT JOIN
                user_contents ON event_items.image_id = user_contents.id 
            
            WHERE
                event_items.event_id = $1
        `, [eventId]) as db_event_item_with_image[];
        return data;

    } catch (e) {
        console.error(e);
        return null;

    }
}


export async function db_updateEventItem(item_id: db_event_item_id, name: string, description: string, price: number, image_id?: db_user_content_id) {
    const data = await sql.query("UPDATE event_items SET name = $1, description = $2, price = $3, image_id = $4 WHERE id = $5 RETURNING *", [name, description, price, image_id, item_id]) as db_event_item[];
    return data.length > 0 ? data[0] : null;

}