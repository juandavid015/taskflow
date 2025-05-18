import React, { forwardRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { PlusIcon } from "../icons";

export type Avatar = {
  id: string;
  username: string;
  imageUrl: string;
};

interface MultiAvatarProps {
  avatars: Avatar[];
  onAdd?: () => void;
}

export const MultiAvatar = forwardRef<HTMLDivElement, MultiAvatarProps>(
  ({ avatars, onAdd }, ref) => {
    const getInitials = (username: string) => {
      return username
        .split(" ")
        .map((name) => name[0])
        .join("");
    };

    return (
      <div ref={ref} className="flex items-center">
        <div className="flex -space-x-4">
          {avatars.map((avatar, idx) => (
            <Avatar
              key={idx}
              className="border-2 border-black"
              style={{
                zIndex: avatars.length - idx,
              }}
            >
              {avatar.imageUrl ? (
                <AvatarImage src={avatar.imageUrl} alt={avatar.username} />
              ) : (
                <AvatarFallback>{getInitials(avatar.username)}</AvatarFallback>
              )}
            </Avatar>
          ))}
        </div>
        <button
          onClick={onAdd}
          className="ml-4 flex items-center justify-center rounded-full bg-gray-200 w-7 h-7 text-2xl text-black cursor-pointer"
          aria-label="Add"
          type="button"
        >
          <PlusIcon className="w-3 h-3" />
        </button>
      </div>
    );
  }
);

MultiAvatar.displayName = "MultiAvatar";
