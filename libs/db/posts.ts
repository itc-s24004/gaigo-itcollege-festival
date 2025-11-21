import { db_default_query, sql } from "./db";
import { db_event_id, db_post, db_post_id, db_user_content_id, db_user_id } from "./db.type";



export async function db_addPost(userID: db_user_id, content: string, eventID?: db_event_id, imageID?: db_user_content_id) {
    const data = await sql.query("INSERT INTO posts (user_id, content, event_id, image_id) VALUES ($1, $2, $3, $4) RETURNING *", [userID, content, eventID || null, imageID || null]) as db_post[];
    return data;
}


export async function db_getPosts(query?: db_default_query) {
    const { limit, offset = 0 } = query || {};

    return (limit == undefined) ?
        await sql.query("SELECT * FROM posts WHERE is_deleted = false ORDER BY created_at DESC") as db_post[] :
        await sql.query("SELECT * FROM posts WHERE is_deleted = false ORDER BY created_at DESC LIMIT $1 OFFSET $2", [limit, offset]) as db_post[];

}

export async function db_getPostsByEventID(eventID: db_event_id, query?: db_default_query) {
    const { limit, offset = 0 } = query || {};
    return (limit == undefined) ?
        await sql.query("SELECT * FROM posts WHERE event_id = $1 AND is_deleted = false ORDER BY created_at DESC", [eventID]) as db_post[] :
        await sql.query("SELECT * FROM posts WHERE event_id = $1 AND is_deleted = false ORDER BY created_at DESC LIMIT $2 OFFSET $3", [eventID, limit, offset]) as db_post[];
    
}

export async function db_getPostsByUserID(userID: db_user_id, query?: db_default_query) {
    const { limit, offset = 0 } = query || {};
    return (limit == undefined) ?
        await sql.query("SELECT * FROM posts WHERE user_id = $1 AND is_deleted = false ORDER BY created_at DESC", [userID]) as db_post[] :
        await sql.query("SELECT * FROM posts WHERE user_id = $1 AND is_deleted = false ORDER BY created_at DESC LIMIT $2 OFFSET $3", [userID, limit, offset]) as db_post[];

}

export async function db_deletePost(postID: db_post_id) {
    await sql.query("UPDATE posts SET is_deleted = true WHERE id = $1", [postID]);
}