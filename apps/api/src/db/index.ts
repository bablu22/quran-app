import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "quran.sqlite");

const db = new Database(dbPath, {
  readonly: true, // safer for your use case
});

export default db;
