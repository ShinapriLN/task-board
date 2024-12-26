"use server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

export async function formAction(formData: FormData) {
  const [taskname, description, icon, status] = await Promise.all([
    formData.get("task-name"),
    formData.get("description"),
    formData.get("icon"),
    formData.get("status") || "status-default",
  ]);

  if (taskname && icon) {
    const { data, error } = await supabase.from("task").insert([
      {
        taskname: taskname,
        description: description,
        icon: icon,
        status: status,
      },
    ]);
    if (error) {
      return console.log("action error", error);
    }
  }

  // console.log(data);

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

  const { data, error } = await supabase
    .from("task")
    .update([
      {
        taskname: taskname,
        description: description,
        icon: icon || defaulticon,
        status: status || defaultstatus,
      },
    ])
    .eq("id", id);

  if (error) {
    return console.log("action error", error);
  }

  // console.log(data);

  revalidatePath("/");

  // console.log("Have a nice day!");
}

export async function formRemove(formData: FormData) {
  const removalId = formData.get("removal-id");

  const { error } = await supabase.from("task").delete().eq("id", removalId);

  if (error) {
    return console.log("action error", error);
  }

  revalidatePath("/");
}
