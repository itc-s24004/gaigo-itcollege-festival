"use server";

import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);


export async function db_getTables() {
    const data = await sql`SELECT * FROM pg_tables`;
    return data;
}


export async function db_getEnums() {
    const data = await sql`SELECT * FROM pg_enum`;
    return data;
}