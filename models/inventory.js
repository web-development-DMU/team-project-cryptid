import { db } from '../tools/db.js'
import items from "./items.json" with { type: "json" };

db.exec(`
CREATE TABLE IF NOT EXISTS inventory (
    username STRING PRIMARY KEY
)`);

const columns = db.prepare(`PRAGMA table_info('inventory')`).all().map(x => x['name']).filter(z => z != "username");
console.log(columns)

for (var key in items) {
    console.log(key)
    if (!columns.includes(key)) {
        db.exec(`ALTER table inventory ADD "${key}" STRING`);
    }
}

