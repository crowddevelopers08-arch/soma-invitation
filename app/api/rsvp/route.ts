import { NextResponse } from "next/server";

// Receives RSVP submissions. Forward `body` to wherever the client wants responses
// (Google Sheets, email, a database); for now it is logged on the server.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  console.log("RSVP", { ...body, receivedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
