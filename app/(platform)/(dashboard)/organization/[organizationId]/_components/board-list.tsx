import FormPopOver from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import React from "react";

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopOver side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              description={`
          Free workspaces are limited to 5 boards. Upgrade to a paid plan to create unlimited number of boards.
          `}
              sideOffset={40}
            >
              <HelpCircle className="h-[14px] w-[14px] text-neutral-500 absolute bottom-2 right-2" />
            </Hint>
          </div>
        </FormPopOver>
      </div>
    </div>
  );
};

export default BoardList;
