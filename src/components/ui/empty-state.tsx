import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
interface EmptyStateProps {
  title?: string;
  message?: string;
  actionButton?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  message = "No items found.",
  actionButton,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <Image
        src="/images/empty-state.png"
        alt="Empty state"
        width={120}
        height={120}
        className="mb-6 opacity-80"
        priority
      />
      {title && <h2 className="font-bold text-white mb-2">{title}</h2>}
      <p className="text text-white/80 font-medium">{message}</p>
      {actionButton && <div className="mt-6">{actionButton}</div>}
    </div>
  );
} 