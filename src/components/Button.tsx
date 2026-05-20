import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "danger" | "ghost";
  children: ReactNode;
}

export default function Button({ variant, children, className, ...props }: ButtonProps) {
  return (
    <button className={cn("btn", `btn-${variant}`, className)} {...props}>
      {children}
    </button>
  );
}
