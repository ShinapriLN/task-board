import { db } from "@/app/lib/db";

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { taskid: string } }
) {
  const { taskid } = await params;
  const res = db.prepare(`SELECT * FROM task where id=?`);
  const result = await res.get(parseInt(taskid));

  return NextResponse.json(result);
}
