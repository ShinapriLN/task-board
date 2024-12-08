import { db } from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskid: string }> }
) {
  const taskId = (await params).taskid;
  const res = db.prepare(`SELECT * FROM task where id=?`);
  const result = await res.get(parseInt(taskId));

  return NextResponse.json(result);
}
