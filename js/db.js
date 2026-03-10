import { DB } from "https://deno.land/x/sqlite/mod.ts";
export default async function createDB(name) {
    const   db = new DB(`./db/${name}.db`),
            sql = await Deno.readTextFile(`./sql/${name}.sql`);
    db.execute(sql);
    console.log(`db "${name}" created`)
    db.close();
}