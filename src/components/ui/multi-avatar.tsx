import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { PlusIcon } from "../icons";

interface MultiAvatarProps {
  avatars: { src?: string; alt?: string; fallback?: string }[];
  onAdd?: () => void;
}

export function MultiAvatar({ avatars, onAdd }: MultiAvatarProps) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-4">
        {avatars.map((avatar, idx) => (
          <Avatar key={idx} className="border-2 border-black">
            {avatar.src ? (
              <AvatarImage src={avatar.src} alt={avatar.alt} />
            ) : (
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            )}
          </Avatar>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="ml-4 flex items-center justify-center rounded-full bg-gray-200 w-7 h-7 text-2xl text-black"
        aria-label="Add"
      >
        <PlusIcon className="w-3 h-3" />
        
      </button>
    </div>
  );
} 