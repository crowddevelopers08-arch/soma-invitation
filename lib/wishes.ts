import { neon } from "@neondatabase/serverless";

// Guestbook storage: a `wishes` table in Neon Postgres. The connection string comes from
// DATABASE_URL, which is in .env.local for development and in Vercel's settings when deployed.

export type Wish = { id: string; name: string; message: string; createdAt: string };

type Row = { id: string; name: string; message: string; created_at: Date };

const toWish = (row: Row): Wish => ({
  id: row.id,
  name: row.name,
  message: row.message,
  createdAt: new Date(row.created_at).toISOString(),
});

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

// Creates the table on first use, so a fresh database needs no setup step.
let ready: Promise<unknown> | undefined;

function ensureTable() {
  ready ??= db()`
    CREATE TABLE IF NOT EXISTS wishes (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      message text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `.catch((error) => {
    ready = undefined;
    throw error;
  });
  return ready;
}

// Newest first.
export async function listWishes(): Promise<Wish[]> {
  await ensureTable();
  const rows = await db()`SELECT id, name, message, created_at FROM wishes ORDER BY created_at DESC`;
  return (rows as Row[]).map(toWish);
}

export async function addWish(name: string, message: string): Promise<Wish> {
  await ensureTable();
  const rows = await db()`
    INSERT INTO wishes (name, message)
    VALUES (${name}, ${message})
    RETURNING id, name, message, created_at
  `;
  return toWish(rows[0] as Row);
}
