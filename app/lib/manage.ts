import { supabase } from "./supabase";

export const fetchTask = async () => {
  const { data: task, error } = await supabase
    .from("task")
    .select("*")
    .order("id", { ascending: true });
  if (!error) {
    return task;
  }
  console.log("Task error");
};

export const fetchSpecific = async (id: number) => {
  const { data: task, error } = await supabase
    .from("task")
    .select("*")
    .eq("id", id);

  if (!error && task && task?.length > 0) {
    return task[0];
  }

  console.log("Task[0] error");
};
