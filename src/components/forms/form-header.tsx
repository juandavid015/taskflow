import { cn } from "@/lib/utils";

interface DialogHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}
function FormHeader({
  title,
  description,
  icon,
  className,
}: DialogHeaderProps) {
  const Icon = icon;
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-white/30 pb-4",
        className
      )}
    >
      {Icon}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
}

export default FormHeader;
