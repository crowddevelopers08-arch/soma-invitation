import { promises as fs } from "node:fs";
import path from "node:path";

// Guestbook storage: a JSON file on the server's disk. This needs a host with a persistent,
// writable disk. On serverless hosts like Vercel, replace these two functions with a database.

export type Wish = { id: string; name: string; message: string; createdAt: string };

const FILE = path.join(process.cwd(), "data", "wishes.json");

async function read(): Promise<Wish[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

// Newest first.
export function listWishes() {
  return read();
}

// Writes run one at a time, so two guests posting together can't overwrite each other.
let queue: Promise<unknown> = Promise.resolve();

export function addWish(name: string, message: string) {
  const write = queue.then(async () => {
    const wish: Wish = { id: crypto.randomUUID(), name, message, createdAt: new Date().toISOString() };
    const wishes = await read();
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify([wish, ...wishes], null, 2));
    return wish;
  });
  queue = write.catch(() => {});
  return write;
}
