"use server";

import { sql } from "./db";
import { db_event_id, db_event_user, db_user_id } from "./db.type";



export async function db_addEventUser(eventID: db_event_id, userID: db_user_id) {
    const data = await sql.query("INSERT INTO event_users (event_id, user_id) VALUES ($1, $2) RETURNING id", [eventID, userID]);
    return data[0].id;
}


export async function db_getEventUsers() {
    const data = await sql.query("SELECT * FROM event_users") as db_event_user[];
    return data;
}


export async function db_getEventUsersByEventID(eventID: db_event_id) {
    const data = await sql.query("SELECT * FROM event_users WHERE event_id = $1", [eventID]) as db_event_user[];
    return data;    
}


export async function db_getEventUsersByUserID(userID: db_user_id) {
    const data = await sql.query("SELECT * FROM event_users WHERE user_id = $1", [userID]) as db_event_user[];
    return data;    
}