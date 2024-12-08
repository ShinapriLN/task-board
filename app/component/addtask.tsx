import { StaticImport } from "next/dist/shared/lib/get-img-props";
import AddSvg from "@/public/resources/Add_round_duotone.svg";
import Image from "next/image";
import { motion } from "framer-motion";

const Color = {
  default: { card: "#F5E8D5", btn: "#E9A23B" },
  yellow: { card: "#F5D565", btn: "#E9A23B" },
  green: { card: "#A0ECB1", btn: "#32D657" },
  red: { card: "#F7D4D3", btn: "#DD524C" },
};

export default function AddTask({
  icon = AddSvg,
  title,
  color = "default",
}: {
  icon?: StaticImport;
  title: string;
  color?: keyof typeof Color;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="flex justify-between rounded-2xl p-4 hover:cursor-pointer "
      style={{ background: Color[color].card }}
    >
      <div className="flex gap-5 ">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: Color[color].btn }}
        >
          <Image src={icon} alt="Icon" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-[1rem] font-semibold">{title}</div>
        </div>
      </div>
    </motion.div>
  );
}
