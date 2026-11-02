import { NextResponse } from "next/server";
import { addWish, listWishes } from "@/lib/wishes";

export const dynamic = "force-dynamic";

const MAX_NAME = 60;
const MAX_MESSAGE = 500;

export async function GET() {
  try {
    return NextResponse.json(await listWishes());
  } catch (error) {
    console.error("Could not read wishes", error);
    return NextResponse.json({ error: "Could not load wishes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !message || name.length > MAX_NAME || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Please enter your name and wishes" }, { status: 400 });
  }
  // The honeypot field is hidden from guests, so anything in it came from a bot.
  if (body.website) return NextResponse.json({ error: "Rejected" }, { status: 400 });

  try {
    return NextResponse.json(await addWish(name, message), { status: 201 });
  } catch (error) {
    console.error("Could not save wish", error);
    return NextResponse.json({ error: "Could not save your wishes" }, { status: 500 });
  }
}
