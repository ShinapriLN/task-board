"use server";
import { revalidatePath } from "next/cache";
import { db } from "./db";

export async function formAction(formData: FormData) {
  const [taskname, description, icon, status] = await Promise.all([
    formData.get("task-name"),
    formData.get("description"),
    formData.get("icon"),
    formData.get("status") || "status-default",
  ]);

  const insert = db.prepare(
    `INSERT INTO task ([taskname], [description], [icon], [status]) VALUES (?,?,?,?)`
  );
  insert.run(taskname, description, icon, status);
  revalidatePath("/");

  // console.log(
  //   "Here!! why you don't have an ID??? oh...you want to add? not modify...oke I got it."
  // );
}

export async function formActionModify(formData: FormData) {
  const [taskname, description, icon, status, id, defaulticon, defaultstatus] =
    await Promise.all([
      formData.get("task-name"),
      formData.get("description"),
      formData.get("icon"),
      formData.get("status"),
      formData.get("id"),
      formData.get("default-icon"),
      formData.get("default-status"),
    ]);

  const update = db.prepare(
    `UPDATE [task]
    SET [taskname]=?, [description]=?, [icon]=?, [status]=?
    WHERE ([task].[id] = ?)`
  );
  update.run(
    taskname,
    description,
    icon || defaulticon,
    status || defaultstatus,
    id
  );

  revalidatePath("/");
  // console.log("Have a nice day!");
}

export async function formRemove(formData: FormData) {
  const removalId = await formData.get("removal-id");

  const remove = db.prepare(`DELETE FROM [task] WHERE ([task].[id] = ?)`);
  remove.run(removalId);
  revalidatePath("/");
}
