import React from "react";
import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import FormPopOver from "@/components/form/form-popover";
import { Button } from "@/components/ui/button";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <nav className="fixed z-50 px-4 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <div className="md:hidden">
          <FormPopOver>
            <Button
              size={"sm"}
              variant={"primary"}
              className="rounded-sm block md:hidden items-center justify-center"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </FormPopOver>
        </div>
        <FormPopOver align="start" side="bottom" sideOffset={18}>
          <Button
            size={"sm"}
            variant={"primary"}
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          >
            Create
          </Button>
        </FormPopOver>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl={"/organization/:id"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: "32px",
                width: "32px",
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
