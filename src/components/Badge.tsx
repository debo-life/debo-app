import { MemoryType } from "../types/memory";
import { cn } from "../lib/cn";

interface BadgeProps {
  type: MemoryType;
}

const labels: Record<MemoryType, string> = {
  thought: "Thought",
  task: "Task",
  idea: "Idea",
  link: "Link",
  journal: "Journal",
};

export default function Badge({ type }: BadgeProps) {
  return (
    <span className={cn("badge", `badge-${type}`)}>
      {labels[type]}
    </span>
  );
}
