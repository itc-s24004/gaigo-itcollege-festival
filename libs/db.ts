// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function getData() {
    const data = await sql`SELECT * FROM information_schema.schemata;`;
    return data;
}

export async function getTables() {
    const data = await sql`SELECT * FROM pg_tables`;
    return data;
}


export async function getEnums() {
    const data = await sql`SELECT * FROM pg_enum`;
    return data;
}


export async function getUserByEmail(email: string): Promise<db_user | null> {
    const data = await sql.query("SELECT * FROM users WHERE email = $1", [email]) as db_user[];
    if (data.length === 0) {
        return null;
    }
    return data[0];
}


export async function getUsers() {
    const data = await sql.query("SELECT * FROM users");
    return data;
}


export async function addUser(email: string, name: string) {
    const data = await sql.query("INSERT INTO users (email, nickName, update_nickName) VALUES ($1, $2, now())", [email, name.substring(0, 30)]);
    return data;
}





export enum db_userLevel {
    observer = "observer",
    user = "user",
    admin = "admin",
    superAdmin = "superAdmin"
}


export type db_user = {
    id: string;
    email: string;
    level: db_userLevel;
    nickname: string;
    update_nickname: string;
}

export type db_food_shop = {
    id: string;
    owner: string;
    name: string;
    descriptions: string;
}





export async function getFoodShop() {
    return await sql`SELECT * FROM food_shops` as db_food_shop[];
}

export async function getFoodShopByID(id: string) {
    const data = await sql.query("SELECT * FROM food_shops WHERE id = $1", [id]) as db_food_shop[];
    if (data.length === 0) {
        return null;
    }
    return data[0];
}


export async function addFoodShop(owner: string, name: string, descriptions: string) {
    const data = await sql.query("INSERT INTO food_shops (owner, name, descriptions) VALUES ($1, $2, $3) RETURNING id", [owner, name, descriptions]);
    console.log(data);
    return data[0].id;
}