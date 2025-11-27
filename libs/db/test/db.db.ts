import { neon } from "@neondatabase/serverless";
import type { db_festival, db_user } from "../db.type";

type db_tables_type = {
    [tableName: string]: sql_table;
}



type sql_table = {
    id: string;
    [column: string]: string | number | boolean | null;
}



type sql_select_options<Table extends sql_table, Tables extends db_tables_type> = {
    columns?: (keyof Table)[];
    where?: sql_select_option_where<Table>;
    join?: sql_select_option_join<Table, Tables>;
    orderBy?: {
        column: keyof Table;
        direction: "asc" | "desc";
    }[]
    limit?: number;
    offset?: number;
}


type sql_select_option_where<Table extends sql_table> = {
    [K in keyof Table]?: {
        operator: "=" | "!=" | "<" | "<=" | ">" | ">=" | "LIKE" | "IN";
        value: Table[K];
    }
}

type sql_select_option_join<Table extends sql_table, Tables extends db_tables_type> = {
    [table in keyof Tables]?: {
        column: keyof Tables[table];
        as?: string;
    }
}


class DB<T extends db_tables_type = DB_TYPE> {
    #sql
    #checks: {
        [tableName in keyof T]?: ((data: insert_data<T[tableName]>) => Promise<boolean>)[];
    } = {}
    constructor(url: string) {
        this.#sql = neon(url);
    }


    async select(tableName: keyof T, options?: sql_select_options<T[keyof T], T>) {
        if (options) {
            const params: (string | number | boolean | null)[] = [];
            const {columns, where, join} = options;
            const whereQuery = where ? Object.entries(where).map(([column, condition]) => {
                params.push(condition.value);
                return `${column} ${condition.operator} $${params.length}`;
            }).join(" AND ") : null;

            const joinQuery = join ? Object.entries(join) : null;

            return await this.#sql.query(`SELECT ${columns ? columns.join(", ") : "*"} FROM ${tableName.toString()} ${whereQuery ? `WHERE ${whereQuery}` : ""}`, params);

        } else {
            return await this.#sql.query(`SELECT * FROM ${tableName.toString()}`);

        }
        
    }

    insert(tableName: keyof T, data: insert_data<T[keyof T]>) {
        const values = Object.keys(data);
        this.#sql.query(`INSERT INTO ${tableName.toString()} (${Object.keys(data).join(", ")}) VALUES (${values.map((_, i) => `$${i+1}`).join(", ")})`, values);
    }

    insert_check(tableName: keyof T, check: (data: insert_data<T[keyof T]>) => Promise<boolean>) {
        const calls = this.#checks[tableName] ?? (this.#checks[tableName] = []);
        calls.push(check);
    }
}


type insert_data<Table extends sql_table> = {
    [K in Exclude<keyof Table, 'id' | 'created_at' | 'updated_at' | 'is_deleted'>]: Table[K];
}

type DB_TYPE = {
    "users": db_user,
    "festivals": db_festival
}


const db_test = new DB<DB_TYPE>('postgresql://neondb_owner:npg_Goi0IxtuDFV5@ep-steep-pond-a15ja6jy-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');


(async () => {
    const data = await db_test.select("users", {
        where: {
            email: {
                operator: "LIKE",
                value: "s240%"
            }
        }
    })


})()
