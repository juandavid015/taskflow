import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const avatars = [
  {
    src: "https://images.pexels.com/photos/31360907/pexels-photo-31360907.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: 'avatar 1'
  },
  {
    src: "https://images.pexels.com/photos/31249880/pexels-photo-31249880/free-photo-of-jovenes-urbanos-en-una-tienda-de-conveniencia-iluminada-con-neon.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "avatar 2",
  },
  {
    src: "https://images.pexels.com/photos/30218143/pexels-photo-30218143/free-photo-of-retrato-en-primer-plano-de-un-hombre-al-aire-libre-con-ropa-informal.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "avatar 3",
  },
  {
    src: "https://github.com/shadcn.png",
    alt: "shadcn",
    active: true,
  },
];

export const Sidebar = () => {
  return (
    <div className="h-full p-4 flex flex-col items-center justify-center border-r border-r-[#333333]">
      {
        <div className="flex flex-col gap-4">
          {avatars.map((avatar) => (
            <Avatar key={avatar.alt} className={cn(
                "w-7 h-7",
                avatar.active && "border-2 border-yellow-green"
              )}
            >
              <AvatarImage src={avatar.src} />
              <AvatarFallback className="capitalize">
                {avatar.alt.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      }
    </div>
  );
};
