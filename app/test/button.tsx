"use client";

import { useState } from "react";
import Modaltest from "./modal";

export default function Button() {
  const [active, setActive] = useState(false);
  const onClose = () => setActive(false);
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <button
        onClick={() => setActive(true)}
        className="rounded-xl p-4 bg-blue-500 text-white
       hover:bg-blue-500/85 duration-100 cursor-pointer"
      >
        Open modal
      </button>
      {active && <Modaltest active={active} onClose={onClose} />}
    </div>
  );
}
