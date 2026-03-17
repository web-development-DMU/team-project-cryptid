import { DB } from "https://deno.land/x/sqlite/mod.ts";
export const db = new DB(`test.db`);
db.execute(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        level INTEGER
    );
    INSERT INTO users (firstname, lastname, username, password) VALUES (
        'John',
        'Doe',
        '1',
        '1'
    );
`);