"use client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { PlusIcon, XIcon } from "./icons";

interface AvatarSession {
  id: string;
  isActive: boolean;
  username: string;
  sessionId: string;
  imageUrl?: string;
}

export const Sidebar = () => {
  const { client, setActive, user, openSignIn, signOut } = useClerk();
  const [loadingSessionId, setLoadingSessionId] = useState<string | null>(null);

  const sessions = client?.sessions ?? [];

  const avatars: AvatarSession[] = sessions.map((session) => ({
    id: session.user?.id ?? "",
    isActive: user?.id === session.user?.id,
    imageUrl: session.user?.imageUrl,
    username: `${session.user?.firstName} ${session.user?.lastName}`,
    sessionId: session.id,
  }));

  const handleSessionSwitch = async (sessionId: string) => {
    setLoadingSessionId(sessionId);
    try {
      await setActive({ session: sessionId });
    } catch (error) {
      console.error("Failed to switch session:", error);
    } finally {
      setLoadingSessionId(null);
    }
  };

  const handleRemoveSession = async (sessionId: string) => {
    setLoadingSessionId(sessionId);
    try {
      await signOut({
        redirectUrl: "/",
        sessionId,
      });
    } catch (error) {
      console.error("Failed to remove session:", error);
    } finally {
      setLoadingSessionId(null);
    }
  };

  const getUserNameInitials = (username: string) => {
    // First two letters of the username
    return username.slice(0, 2);
  };
  return (
    <div className="h-full p-4 flex flex-col items-center justify-center border-r border-r-[#333333]">
      <div className="flex flex-col gap-4 ">
        {avatars?.map((avatar) => {
          const isLoading = loadingSessionId === avatar.sessionId;
          return (
            <div key={avatar.id} className="relative group/session-avatar">
              <Avatar
                onClick={() =>
                  !isLoading && handleSessionSwitch(avatar.sessionId)
                }
                key={avatar.id}
                className={cn(
                  "w-8 h-8 relative cursor-pointer border-2 border-transparent hover:border-white transition-all duration-200",
                  avatar.isActive &&
                    "border-2 border-yellow-green hover:border-yellow-green",
                  isLoading && "pointer-events-none"
                )}
              >
                <AvatarImage
                  src={avatar.imageUrl}
                  className={cn(isLoading && "opacity-50")}
                />
                <AvatarFallback className="capitalize">
                  {getUserNameInitials(avatar.username)}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => handleRemoveSession(avatar.sessionId)}
                className={cn(
                  "flex items-center justify-center absolute -top-1.5 -right-1.5 w-3.5 h-3.5 cursor-pointer",
                  "bg-red-600 rounded-full hover:bg-red-500 transition-all duration-200 group-hover/session-avatar:flex hidden",
                  isLoading && "pointer-events-none"
                )}
              >
                <XIcon className="w-2 h-2 fill-white text-white" />
                <span className="sr-only">Remove session</span>
              </button>
            </div>
          );
        })}

        {/* Add session button */}
        <button
          onClick={() =>
            openSignIn({
              oauthFlow: "popup",
            })
          }
          className="w-7 h-7 relative cursor-pointer bg-white rounded-full flex items-center justify-center"
        >
          <PlusIcon className="w-3 h-3 fill-white" />
          <span className="sr-only">Add session</span>
        </button>
      </div>
    </div>
  );
};
