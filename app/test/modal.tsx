"use client";

export default function Modaltest({
  active,
  onClose,
}: {
  active: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`w-[540px] h-[560px] rounded-xl ${
        active ? "flex" : "none"
      } flex-col justify-between
     bg-violet-400 p-5 absolute`}
    >
      <div className="flex flex-col">
        <div className="font-bold text-3xl">This is header</div>
        <div>This is content</div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-red-500 p-4 rounded-xl text-white 
          hover:bg-red-500/85 duration-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}
