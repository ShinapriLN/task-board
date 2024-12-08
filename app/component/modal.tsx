"use client";
import CloseSvg_1 from "@/public/resources/close_ring_duotone-1.svg";
import TrashSvg from "@/public/resources/Trash.svg";
import CloseSvg from "@/public/resources/close_ring_duotone.svg";
import DoneSvg from "@/public/resources/Done_round.svg";
import TimeSvg from "@/public/resources/Time_atack_duotone.svg";

import { motion } from "framer-motion";
import Image from "next/image";
import { formAction, formActionModify } from "../lib/action";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import RemovalModal from "./removalmodal";
import { Task, statusMatchTask } from "../lib/utils";
import { fetchSpecific } from "../lib/manage";

export default function Modal({
  taskId,
  active,
  onClose,
  revalidation,
}: {
  taskId: number | null;
  active: boolean;
  onClose: () => void;
  revalidation: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const [iconSelect, setIconSelect] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [removeModalActive, setRemoveModalActive] = useState(false);

  useEffect(() => {
    if (taskId && taskId !== 0) {
      const getTask = async () => {
        const result = await fetchSpecific(taskId);
        setTask(result);
      };
      getTask();
    } else {
      setIconSelect("");
      setStatusSelect("");
    }
  }, [taskId]);

  useEffect(() => {
    setIconSelect(task?.icon || "");
    setStatusSelect(task?.status || "");
  }, [task]);

  const handleSubmit = () => {
    revalidation[1](!revalidation[0]);
    onClose();
    if (removeModalActive) setRemoveModalActive(false);
    // HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    // setTimeout(() => {

    // }, 100);
    if (taskId && taskId !== 0) {
      const getTask = async () => {
        const result = await fetchSpecific(taskId);
        setTask(result);
      };
      getTask();
    }
    setIconSelect("");
    setStatusSelect("");
  };

  const handleRemove = () => {
    setRemoveModalActive(true);
  };

  return (
    <motion.div
      animate={{
        translateX: active ? "0%" : "-5%", // เคลื่อนที่เข้ามาหรือออกจากหน้าจอ
        opacity: active ? 1 : 0, // จางหายหรือแสดง
      }}
      transition={{ duration: 0.1 }} // เวลาในการเคลื่อนไหว
      className={`w-full h-full rounded-xl ${
        active ? "grid" : "hidden"
      } grid grid-cols-1 justify-between sm:grid-cols-2
   p-5 absolute top-0 bottom-0 left-0 right-0 z-0 h-full w-full`}
    >
      <div
        onClick={onClose}
        className="bg-black/40 absolute w-full h-full top-0 left-0 right-0 bottom-0"
      ></div>
      {/* <motion.div
        className={"bg-blue-600 rounded-xl absolute w-52 h-52"}
        initial={{ translateY: "100%" }} // เริ่มจากนอกหน้าจอ
        animate={{
          translateY: active ? "0%" : "100%", // เคลื่อนที่เข้ามาหรือออกจากหน้าจอ
          opacity: active ? 1 : 0, // จางหายหรือแสดง
        }}
        transition={{ duration: 1 }} // เวลาในการเคลื่อนไหว
      >
        <button
          onClick={() => revalidation[1](!revalidation[0])}
          className="rounded-xl p-4 bg-blue-500 text-white
       hover:bg-blue-500/85 duration-100 cursor-pointer"
        >
          Open modal
        </button>
      </motion.div> */}

      {/* start Formmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}

      <form
        action={taskId ? formActionModify : formAction}
        className={` bg-white rounded-xl h-full flex flex-col px-8 py-5 
          gap-4 col-start-1 sm:col-start-2 z-10`}
      >
        <div className="flex justify-between">
          <div className="text-[1.25rem]">Task details</div>
          <div
            onClick={onClose}
            className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#F8FAFC] border-[#E3E8EF] border"
          >
            <Image src={CloseSvg_1} alt="Icon" />
          </div>
        </div>

        <input
          id="id"
          type="hidden"
          name="id"
          value={taskId ? taskId : ""}
          readOnly
          // className="hidden"
        />

        <div className="flex flex-col">
          <label className="text-[0.75rem] text-[#97A3B6]">Task name</label>
          <input
            placeholder="Enter a task name."
            defaultValue={taskId ? task?.taskname : ""}
            name="task-name"
            className="border border-[#00000033] text-[1.25rem] font-light px-4 py-2 rounded-lg focus:outline-[#3662E3] "
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.75rem] text-[#97A3B6]">Description</label>
          <textarea
            placeholder="Enter a short description."
            name="description"
            defaultValue={taskId ? task?.description : ""}
            rows={5}
            className="border border-[#00000033] text-[1.25rem] font-light px-4 py-2 rounded-lg focus:outline-[#3662E3] "
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.75rem]">Icon</label>
          <div className="flex gap-2 flex-wrap">
            {[
              "/icon/man-technologist-light-skin-tone-svgrepo-com.png",
              "/icon/speech-bubble-svgrepo-com.png",
              "/icon/coffee-tea-hot-beverage-drink-steaming-svgrepo-com.png",
              "/icon/weightlifting-excercise-svgrepo-com.png",
              "/icon/books-svgrepo-com.png",
              "/icon/alarm-clock-svgrepo-com.png",
            ].map((icon, id) => (
              <div key={id}>
                <input
                  type="radio"
                  name="icon"
                  id={`icon-${id.toString()}`}
                  defaultChecked={
                    taskId ? `icon-${id.toString()}` === task?.icon : false
                  }
                  value={`icon-${id.toString()}`}
                  style={{ display: "none" }}
                  onChange={() => setIconSelect(`icon-${id.toString()}`)}
                  required={taskId ? false : true}
                />
                <label
                  htmlFor={`icon-${id.toString()}`}
                  className={clsx(
                    "w-full flex rounded-xl justify-between items-center"
                  )}
                >
                  <div
                    className={clsx(
                      "w-11 h-11 p-2 rounded-xl flex items-center justify-center bg-[#E3E8EF] ",
                      {
                        "!bg-[#F5D565]": iconSelect === `icon-${id.toString()}`,
                      }
                    )}
                  >
                    <Image src={icon} width={20} height={20} alt="Icon" />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-[0.75rem]">Status</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
            {[TimeSvg, DoneSvg, CloseSvg].map((status, id) => (
              <div key={id}>
                <input
                  type="radio"
                  name="status"
                  defaultChecked={
                    taskId ? `status-${id.toString()}` === task?.status : false
                  }
                  id={`status-${id.toString()}`}
                  value={`status-${id.toString()}`}
                  style={{ display: "none" }}
                  onChange={() => setStatusSelect(`status-${id.toString()}`)}
                />
                <label
                  htmlFor={`status-${id.toString()}`}
                  className={clsx(
                    "w-full flex border-2 border-[#E3E8EF] rounded-2xl p-0.5 justify-between items-center",
                    {
                      "border !border-[#3662E3]":
                        statusSelect === `status-${id.toString()}`,
                    }
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        "w-11 h-11 rounded-xl flex items-center justify-center bg-[#F8FAFC]",
                        {
                          "!bg-[#E9A23B]": id === 0,
                          "!bg-[#32D657]": id === 1,
                          "!bg-[#DD524C]": id === 2,
                        }
                      )}
                    >
                      <Image src={TimeSvg} alt="Icon" />
                    </div>
                    <div>{statusMatchTask(`status-${id.toString()}`)}</div>
                  </div>
                  {statusSelect === `status-${id.toString()}` && (
                    <div
                      className={clsx(
                        "mx-2 rounded-full flex items-center justify-center bg-[#3662E3] border-[#00000033] border"
                      )}
                    >
                      <Image src={DoneSvg} alt="Icon" />
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        <input
          type="hidden"
          name="default-icon"
          value={(taskId && task?.icon) || ""}
          readOnly
        />
        <input
          type="hidden"
          name="default-status"
          value={(taskId && task?.status) || ""}
          readOnly
        />

        <div className="w-full h-full flex justify-end items-end">
          <div className="flex gap-4 ">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              disabled={
                taskId && [13, 14, 15, 16].includes(taskId) ? true : false
              }
              onClick={taskId ? handleRemove : onClose}
              type="button"
              className="rounded-full py-1.5 px-6 bg-[#97A3B6] text-white text-[0.875rem] flex gap-1"
            >
              {taskId ? (
                <>
                  Delete
                  <Image src={TrashSvg} alt="trash" />
                </>
              ) : (
                "Cancel"
              )}
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
                type="submit"
                onClick={handleSubmit}
                className={`rounded-full py-1.5 ${
                  taskId ? "px-6" : "px-8"
                }  bg-[#3662E3] text-white text-[0.875rem] flex gap-1`}
              >
                {taskId ? (
                  <>
                    Save
                    <Image src={DoneSvg} alt="Done" />
                  </>
                ) : (
                  <>Add</>
                )}
              </motion.button>
          </div>
        </div>
      </form>
      {task && (
        <RemovalModal
          task={task}
          active={removeModalActive}
          onClose={() => setRemoveModalActive(false)}
          handleSubmit={handleSubmit}
        />
      )}
    </motion.div>
  );
}
