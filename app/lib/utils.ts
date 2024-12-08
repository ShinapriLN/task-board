import DoneSvg from "@/public/resources/Done_round.svg";
import TimeSvg from "@/public/resources/Time_atack_duotone.svg";
import CloseSvg from "@/public/resources/close_ring_duotone.svg";
import axios from "axios";

export const Icon = (icon: string) => {
  if (icon === "icon-0")
    return "/icon/man-technologist-light-skin-tone-svgrepo-com.png";
  if (icon === "icon-1") return "/icon/speech-bubble-svgrepo-com.png";
  if (icon === "icon-2")
    return "/icon/coffee-tea-hot-beverage-drink-steaming-svgrepo-com.png";
  if (icon === "icon-3") return "/icon/weightlifting-excercise-svgrepo-com.png";
  if (icon === "icon-4") return "/icon/books-svgrepo-com.png";
  if (icon === "icon-5") return "/icon/alarm-clock-svgrepo-com.png";
};

export const Status = (status: string) => {
  if (status === "status-0") return TimeSvg;
  if (status === "status-1") return DoneSvg;
  if (status === "status-2") return CloseSvg;
};

export const Color = {
  default: { card: "#E3E8EF", btn: "#fff" },
  yellow: { card: "#F5D565", btn: "#E9A23B" },
  green: { card: "#A0ECB1", btn: "#32D657" },
  red: { card: "#F7D4D3", btn: "#DD524C" },
};
export const colorMatchStatus = (task: string) => {
  if (task === "status-0") return "yellow";
  if (task === "status-1") return "green";
  if (task === "status-2") return "red";
  return "default";
};

export const iconMatchTask = (icon: string) => {
  if (icon === "icon-0") return "In Progress";
  if (icon === "icon-1") return "Completed";
  if (icon === "icon-2") return "Won&apos;t do";
};

export const statusMatchTask = (icon: string) => {
  if (icon === "status-0") return "In Progress";
  if (icon === "status-1") return "Completed";
  if (icon === "status-2") return "Won't do";
};

export type Task = {
  id: number;
  taskname: string;
  description: string;
  icon: string;
  status: string;
};

export const fetchSpecific = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/api/${id}`);
  const result = await res.data;
  return result
};