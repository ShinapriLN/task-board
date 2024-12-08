import { supabase } from "./supabase";

export const fetchTask = async () => {
  let { data: task, error } = await supabase.from("task").select("*");
  if (!error) {
    return task;
  }
  console.log("Task error");
};

export const fetchSpecific = async (id: number) => {
  let { data: task, error } = await supabase
    .from("task")
    .select("*")
    .eq("id", id);

  if (!error && task && task?.length > 0) {
    return task[0];
  }

  console.log("Task[0] error");
};
