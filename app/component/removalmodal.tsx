import { formRemove } from "../lib/action";
import { Task } from "../lib/utils";
import { motion } from "framer-motion";

export default function RemovalModal({
  task,
  active,
  onClose,
  handleSubmit,
}: {
  task: Task;
  active: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`bg-black/40 absolute w-full h-full top-0 left-0 right-0 bottom-0 z-10  ${
          active ? "flex" : "hidden"
        }`}
      ></div>

      <motion.div
        className={`absolute w-96 h-64 top-0 bottom-0 left-0 right-0 m-auto
     z-10 ${active ? "flex" : "hidden"}`}
        animate={{
          scale: active ? 1 : 0,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <form
          action={formRemove}
          className={` bg-[#E3E8EF] rounded-xl flex flex-col p-6 gap-2 `}
        >
          <div className="text-[1.25rem]">Confirm to remove</div>
          <hr className="bg-[#97A3B6] stroke-2 stroke-[#97A3B6] border-1 border-[#97A3B6] rounded-full" />
          <div>
            The task <span className="font-bold">{task.taskname}</span> will be
            permanently removed.
          </div>
          <div className="w-full h-full flex items-end justify-end gap-2">
            <input type="hidden" name="removal-id" value={task.id} readOnly />
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <button
                onClick={onClose}
                type="button"
                className={`rounded-full py-1.5 px-4
            bg-[#97A3B6] text-white text-[0.875rem] flex gap-1`}
              >
                Cancel
              </button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <button
                type="submit"
                onClick={handleSubmit}
                className={`rounded-full py-1.5  px-3
            bg-[#DD524C] text-white text-[0.875rem] flex gap-1`}
              >
                Confirm
              </button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </>
  );
}
