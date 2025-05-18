import { Button } from "@/components/ui/button";
import { CheckCheck, XIcon, AlertTriangle, AlertCircle } from "lucide-react";

export enum NotificationType {
  Success = "success",
  Error = "error",
  Warning = "warning",
}

export type NotificationProps = {
  message: string;
  title: string;
  onClose: () => void;
  type: NotificationType;
};

export function Notification({
  message,
  title,
  onClose,
  type,
}: NotificationProps) {
  const styles = {
    [NotificationType.Success]: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-700",
      icon: <CheckCheck className="w-4 h-4" />,
    },
    [NotificationType.Error]: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-700",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    [NotificationType.Warning]: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-700",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
  };

  const style = styles[type];

  return (
    <div
      className={`${style.bg} ${style.border} rounded-md p-4 flex gap-6 relative items-center`}
    >
      {style.icon}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-2 right-2 cursor-pointer w-fit h-fit p-1"
      >
        <XIcon className="w-4 h-4" />
      </Button>
      <div>
        <h3 className={`text-sm font-medium ${style.text}`}>{title}</h3>
        <p className={`text-sm ${style.text}`}>{message}</p>
      </div>
    </div>
  );
} 