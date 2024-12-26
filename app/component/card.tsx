"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import TimeSvg from "@/public/resources/Time_atack_duotone.svg";
import Image from "next/image";
import { Color } from "../lib/utils";
import { motion } from "framer-motion";

export default function Card({
  icon = [TimeSvg, ""],
  title,
  description,
  color = "default",
}: {
  icon?: [StaticImport | string, StaticImport | string];
  title: string;
  description?: string;
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
      className="flex justify-between rounded-2xl p-4"
      style={{ background: Color[color].card }}
    >
      <div className="flex gap-5 ">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#F8FAFC]  ">
          <Image src={icon[0]} width={20} height={20} alt="Icon" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-[1.25rem] font-semibold">{title}</div>

          {description && (
            <div className="max-w-96 text-[1rem] font-light">{description}</div>
          )}
        </div>
      </div>
      {icon[1] && (
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: Color[color].btn }}
        >
          <Image src={icon[1]} alt="Icon" />
        </div>
      )}
    </motion.div>
  );
}
