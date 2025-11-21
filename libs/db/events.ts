"use server";

import { sql } from "./db";
import { db_event_with_image } from "./db.data";
import { db_festival_id, db_event, db_event_id, db_event_type, db_user_id } from "./db.type";

export async function db_addEvent(festival_id: db_festival_id, owner_id: string, type: db_event_type, name: string, description: string, image?: string) {
    const data = await sql.query("INSERT INTO events (festival_id, owner_id, type, name, description, image_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [festival_id, owner_id, type, name, description, image]) as db_event[];
    return data;
}








// すべてのイベントを取得▼
export async function db_getEvents() {
    const data = await sql.query("SELECT * FROM events") as db_event[];
    return data;    
}

export async function db_getEventsWithImage() {
    const data = await sql.query(`
        SELECT 
            events.*,
            user_contents.url AS image_url 
        FROM 
            events 
        LEFT JOIN 
            user_contents ON events.image_id = user_contents.id
    `) as db_event_with_image[];
    return data;    
}



// イベントidから取得▼
export async function db_getEventByID(eventId: db_event_id) {
    try {
        const data = await sql.query("SELECT * FROM events WHERE id = $1", [eventId]) as db_event[];
        return data.length > 0 ? data[0] : null;
    } catch {
        return null;
    }
}

export async function db_getEventWithImageByID(eventId: db_event_id) {
    const data = await sql.query(`
        SELECT 
            events.*,
            user_contents.url AS image_url 
        FROM 
            events 
        LEFT JOIN 
            user_contents ON events.image_id = user_contents.id 
        WHERE 
            events.id = $1
    `, [eventId]) as db_event_with_image[];
    return data.length > 0 ? data[0] : null;
}



// フェスティバルidから取得▼
export async function db_getEventsByFestivalID(festivalId: db_festival_id) {
    const data = await sql.query("SELECT * FROM events WHERE festival_id = $1", [festivalId]) as db_event[];
    return data;    
}

export async function db_getEventsWithImageByFestivalID(festivalId: db_festival_id) {
    const data = await sql.query(`
        SELECT 
            events.*,
            user_contents.url AS image_url 
        FROM 
            events 
        LEFT JOIN 
            user_contents ON events.image_id = user_contents.id 
        WHERE 
            events.festival_id = $1
    `, [festivalId]) as db_event_with_image[];
    return data;    
}



// オーナーidから取得▼
export async function db_getEventsByOwnerID(ownerId: db_user_id) {
    const data = await sql.query("SELECT * FROM events WHERE owner_id = $1", [ownerId]) as db_event[];
    return data;
}

export async function db_getEventsWithImageByOwnerID(ownerId: db_user_id) {
    const data = await sql.query(`
        SELECT 
            events.*,
            user_contents.url AS image_url 
        FROM 
            events 
        LEFT JOIN 
            user_contents ON events.image_id = user_contents.id 
        WHERE 
            events.owner_id = $1
    `, [ownerId]) as db_event_with_image[];
    return data;    
}