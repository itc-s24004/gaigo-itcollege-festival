"use server";

import { sql } from "./db";
import { db_festival_with_image } from "./db.data";
import { db_festival, db_festival_id, db_user_content_id } from "./db.type";


export async function db_addFestival(name: string, description: string, image_id?: db_user_content_id) {
    if (image_id) {
        return await sql.query("INSERT INTO festivals (name, description, image_id) VALUES ($1, $2, $3) RETURNING *", [name, description, image_id]) as db_festival[];
    } else {
        return await sql.query("INSERT INTO festivals (name, description) VALUES ($1, $2) RETURNING *", [name, description]) as db_festival[];
    }
}

export async function db_getFestivals() {
    const data = await sql.query(`
        SELECT 
            *
        FROM 
            festivals 
    `) as db_festival_with_image[];
    return data;
}


export async function db_getFestivalsWithImage() {
    const data = await sql.query(`
        SELECT 
            festivals.*,
            user_contents.url AS image_url 
        FROM 
            festivals 
        LEFT JOIN 
            user_contents ON festivals.image_id = user_contents.id
    `) as db_festival_with_image[];
    return data;
}


export async function db_getFestivalByID(festivalId: db_festival_id) {
    const data = await sql.query("SELECT * FROM festivals WHERE id = $1", [festivalId]) as db_festival[];
    return data.length > 0 ? data[0] : null;
}

export async function db_getFestivalWithImageByID(festivalId: db_festival_id) {
    try {
        const data = await sql.query(`
            SELECT 
                festivals.*,
                user_contents.url AS image_url 
            FROM 
                festivals 
            LEFT JOIN 
                user_contents ON festivals.image_id = user_contents.id
            WHERE 
                festivals.id = $1
        `, [festivalId]) as db_festival_with_image[];
        return data.length > 0 ? data[0] : null;
    } catch {
        return null;
    }
}


export async function db_getArchivedFestivals() {
    const data = await sql.query("SELECT * FROM festivals WHERE is_archived = TRUE") as db_festival[];
    return data;
}


export async function db_getArchivedFestivalsWithImage() {
    const data = await sql.query(`
        SELECT 
            festivals.*,
            user_contents.url AS image_url 
        FROM 
            festivals 
        LEFT JOIN 
            user_contents ON festivals.image_id = user_contents.id
        WHERE 
            festivals.is_archived = TRUE
    `) as db_festival_with_image[];
    return data;
}



export async function db_updateFestival(festivalId: db_festival_id, name: string, description: string, is_archived: boolean, image_id?: db_user_content_id) {
    return await sql.query("UPDATE festivals SET name = $1, description = $2, is_archived = $3, image_id = $4 WHERE id = $5 RETURNING *", [name, description, is_archived, image_id, festivalId]) as db_festival[];
}