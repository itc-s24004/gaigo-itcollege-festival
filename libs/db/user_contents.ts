import { off } from "process";
import { sql } from "./db";
import { db_user_content, db_user_id } from "./db.type";

export async function db_addUserContent(user_id: db_user_id, url: string, type: string) {
    const data = await sql.query("INSERT INTO user_contents (user_id, url, type) VALUES ($1, $2, $3) RETURNING *", [user_id, url, type]) as db_user_content[];
    return data[0];
}

export async function db_getUserContents(user_id: db_user_id, type?: string, limit?: number, offset?: number) {
    if (offset === undefined) offset = 0;
    if (limit === undefined) {
        const data = await sql.query(`
            SELECT * FROM user_contents
            WHERE
                user_id = $1
                AND
                type LIKE $2
            ORDER BY created_at DESC
            OFFSET $3`,
            [user_id, `${type ?? "%"}%`, offset]
        ) as db_user_content[];

        return data;

    } else {
        const data = await sql.query(`
            SELECT * FROM user_contents
            WHERE
                user_id = $1
                AND
                type LIKE $2
            ORDER BY created_at DESC
            LIMIT $3 OFFSET $4`,
            [user_id, `${type ?? "%"}%`, limit, offset]
        ) as db_user_content[];

        return data;
    }
}

export async function db_getUserContentsCount(user_id: db_user_id) {
    const data = await sql.query("SELECT COUNT(*) as count FROM user_contents WHERE user_id = $1", [user_id]) as { count: string }[];
    return parseInt(data[0].count);
}