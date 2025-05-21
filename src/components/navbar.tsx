import {
  OrganizationSwitcher,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
// import SettingsDropdown from "./settings-dropdown";
// import IntegrationsDropdown from "./integrations-dropdown";
import MembersDialog from "@/app/(main)/(members)/components/forms/dialog";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 w-full border-b border-b-[#333333] ">
      <div className="flex items-center gap-4">
        {/* // Worskpace Dropdown */}
        <OrganizationSwitcher />

        {/* // Members Dialog */}
        <MembersDialog />
      </div>

      <div className="flex items-center gap-4">
        {/* // Integrations */}

        {/* // Settings */}
        {/* <IntegrationsDropdown />
        <SettingsDropdown /> */}
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
