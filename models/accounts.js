import { db } from '../tools/db.js'

db.exec(`
CREATE TABLE IF NOT EXISTS accounts (
    username STRING PRIMARY KEY,
    password STRING
)`);

export async function createUser({username, password}) {
    db.prepare(`
        INSERT INTO accounts (username, password) VALUES (:username, :password)`).run({username, password});
}