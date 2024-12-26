import { motion } from "framer-motion";

export default function ValidateModal({
  active,
  onClose,
}: {
  active: boolean;
  onClose: () => void;
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
        <div className={` bg-[#E3E8EF] rounded-xl flex flex-col p-6 gap-2 `}>
          <div className="text-[1.25rem]">Invalid input</div>
          <hr className="bg-[#97A3B6] stroke-2 stroke-[#97A3B6] border-1 border-[#97A3B6] rounded-full" />
          <div>Taskname and icon have to be included!</div>
          <div className="w-full h-full flex items-end justify-end gap-2">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={onClose}
              type="button"
              className={`rounded-full py-1.5 px-4
            bg-[#97A3B6] text-white text-[0.875rem] flex gap-1`}
            >
              Oke
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
