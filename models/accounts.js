import { db } from '../tools/db.js'

db.exec(`
CREATE TABLE IF NOT EXISTS accounts (
    username STRING PRIMARY KEY,
    password STRING
)`);