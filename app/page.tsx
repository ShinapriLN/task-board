"use client";
import Image from "next/image";

import LogoSvg from "@/public/resources/Logo.svg";
import PenSvg from "@/public/resources/Edit_duotone.svg";

import Card from "./component/card";
import AddTask from "./component/addtask";

import axios from "axios";

import { Icon, Status, colorMatchStatus } from "./lib/utils";
import { useEffect, useState } from "react";
import Modal from "./component/modal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [revalidation, setRevalidation] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const fetch = async () => {
    const res = await axios.get("http://localhost:3000/api");
    const result = await res.data;
    setTasks(result);
  };

  const handlePressCard = (id: number) => {
    setTaskId(id);
    setModalActive(true);
  };

  useEffect(() => {
    setTimeout(() => {
      fetch();
    }, 100);
  }, [revalidation]);

  return (
    <div className="w-[552px] flex flex-col">
      <div className="flex my-8 gap-2">
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
        <div className="flex flex-col gap-4 sm:max-h-[500px] sm:overflow-y-scroll scrollbar-hide">
          {tasks.map(
            (task: {
              id: number;
              taskname: string;
              description: string;
              icon: string;
              status: string;
            }) => (
              <div
                key={task.id}
                onClick={() => handlePressCard(task.id)}
                className="mx-5"
              >
                <Card
                  title={task.taskname}
                  description={task.description}
                  icon={[Icon(task.icon) ?? "", Status(task.status)]}
                  color={colorMatchStatus(task.status)}
                />
              </div>
            )
          )}
        </div>

        <div onClick={() => handlePressCard(0)}>
          <AddTask title="Add new task" />
        </div>
      </div>
      <Modal
        id={taskId}
        active={modalActive}
        onClose={() => setModalActive(false)}
        revalidation={[revalidation, setRevalidation]}
      />
    </div>
  );
}
