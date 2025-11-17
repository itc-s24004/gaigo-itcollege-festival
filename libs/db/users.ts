"use server";

import { sql } from "./db";
import { db_user, db_user_id } from "./db.type";

export async function db_addUser(email: string, nickname: string) {
    const data = await sql.query("INSERT INTO users (email, nickname) VALUES ($1, $2)", [email, nickname]);
    return data;
}

export async function db_getUsers() {
    const data = await sql.query("SELECT * FROM users") as db_user[];
    return data;
}

export async function db_getUserByID(userID: db_user_id) {
    const data = await sql.query("SELECT * FROM users WHERE id = $1", [userID]) as db_user[];
    return data.length > 0 ? data[0] : null;
}

export async function db_getUserByEmail(email: string) {
    const data = await sql.query("SELECT * FROM users WHERE email = $1", [email]) as db_user[];
    return data.length > 0 ? data[0] : null;
}