import { db } from '../db.js';
export default function findUser(username, password) {
    return [...db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password]
    )];
}