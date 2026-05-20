import { useEffect } from "react";
import { cn } from "../lib/cn";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={cn("toast", type === "success" && "success")}>{message}</div>;
}
