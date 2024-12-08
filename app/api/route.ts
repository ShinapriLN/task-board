import { db } from "../lib/db";
import { NextResponse } from "next/server";

export function GET() {
  const tasks = db.prepare(`SELECT * FROM task`);

  return NextResponse.json(tasks.all());
}

