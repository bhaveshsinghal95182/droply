import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("No database url in local env");
}

async function runMigrate() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);

    await migrate(db, { migrationsFolder: "./src/drizzle" });
    console.log("All migrations are successfully done");
  } catch (error) {
    console.log("Migrations are unsuccessfull");
    process.exit(1);
  }
}

runMigrate();
