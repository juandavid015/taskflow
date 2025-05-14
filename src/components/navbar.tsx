import {
  OrganizationSwitcher,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import SettingsDropdown from "./settings-dropdown";
import IntegrationsDropdown from "./integrations-dropdown";
import { MultiAvatar } from "./ui/multi-avatar";
const avatars = [
  {
    src: "https://github.com/shadcn.png",
    alt: "shadcn",
  },
];
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 w-full border-b border-b-[#333333] ">
      <div className="flex items-center gap-4">
        {/* // Worskpace Dropdown */}
        <OrganizationSwitcher />

        {/* // Members Dropdown */}
        <MultiAvatar avatars={avatars} />
      </div>

      <div className="flex items-center gap-4">
        {/* // Integrations */}

        {/* // Settings */}
        <IntegrationsDropdown />
        <SettingsDropdown />
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
