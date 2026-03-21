import { db } from '../tools/db.js'

db.exec(`
CREATE TABLE IF NOT EXISTS accounts (
    firstname STRING NOT NULL,
    lastname STRING NOT NULL,
    username STRING PRIMARY KEY NOT NULL,
    email STRING NOT NULL,
    password STRING NOT NULL
)`);

export async function createUser({firstname, lastname, username, email, password}) {
    db.prepare(`
        INSERT INTO accounts (firstname, lastname, username, email, password) VALUES (:firstname, :lastname, :username, :email, :password)
        `).run({firstname, lastname, username, email, password});
}

export async function getUserByUsername(username) {
    return db.prepare(`
        SELECT * FROM accounts WHERE username = :username
        `).get({username});
}

export async function getUserByEmail(email) {
    return db.prepare(`
        SELECT * FROM accounts WHERE email = :email
        `).get({email});
}