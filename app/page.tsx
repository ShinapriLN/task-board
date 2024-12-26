"use client";
import Image from "next/image";

import LogoSvg from "@/public/resources/Logo.svg";
import PenSvg from "@/public/resources/Edit_duotone.svg";

import Card from "./component/card";
import AddTask from "./component/addtask";
import { Task } from "./lib/utils";

import { Icon, Status, colorMatchStatus } from "./lib/utils";
import { useEffect, useState } from "react";
import Modal from "./component/modal";
import { fetchTask } from "./lib/manage";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [revalidation, setRevalidation] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const handlePressCard = (id: number) => {
    if (id) {
      window.history.replaceState({}, "", `/boards/${id}`);
    }
    setTaskId(id);
    setModalActive(true);
  };
  useEffect(() => {
    if (!modalActive) {
      window.history.replaceState({}, "", `/`);
    }
  }, [modalActive]);
  //  HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchTask();
      setTasks(result as Task[]);
    };
    fetch();
  }, []);
  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   const fetch = async () => {
  //   //     const result = await fetchTask();
  //   //     setTasks(result as Task[]);
  //   //   };
  //   //   fetch();
  //   // }, 200);
  //   const fetch = async () => {
  //     const result = await fetchTask();
  //     setTasks(result as Task[]);
  //   };
  //   fetch();
  // }, [revalidation]);

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   const fetch = async () => {
  //   //     const result = await fetchTask();
  //   //     setTasks(result as Task[]);
  //   //   };
  //   //   fetch();
  //   // }, 200);
  //   const fetch = async () => {
  //     const result = await fetchTask();
  //     setTasks(result as Task[]);
  //   };
  //   fetch();
  // }, [modalActive]);

  supabase
    .channel("task")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "task" },
      (payload) => {
        const fetch = async () => {
          // console.log("Change received!", payload);
          const result = await fetchTask();
          setTasks(result as Task[]);
        };
        fetch();
      }
    )
    .subscribe();

  return (
    <div className="w-[552px] flex flex-col">
      <div className="flex my-12 gap-2">
        <div>
          <Image src={LogoSvg} alt="Logo" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="text-4xl">My Task Board</div>
            <Image src={PenSvg} alt="edit icon" />
          </div>
          <div className="text-base">Task to keep organised</div>
        </div>
      </div>

      <div className="flex flex-col gap-4 ">
        {tasks.map(
          (task: {
            id: number;
            taskname: string;
            description: string;
            icon: string;
            status: string;
          }) => (
            <div key={task.id} onClick={() => handlePressCard(task.id)}>
              <Card
                title={task.taskname}
                description={task.description}
                icon={[Icon(task.icon) ?? "", Status(task.status)]}
                color={colorMatchStatus(task.status)}
              />
            </div>
          )
        )}

        <div onClick={() => handlePressCard(0)}>
          <AddTask title="Add new task" />
        </div>
      </div>
      <Modal
        taskId={taskId}
        active={modalActive}
        onClose={() => setModalActive(false)}
        revalidation={[revalidation, setRevalidation]}
      />
    </div>
  );
}
