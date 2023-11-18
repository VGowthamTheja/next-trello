import React from "react";
import { HelpCircle, User2 } from "lucide-react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import FormPopOver from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { db } from "@/lib/db";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
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

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2 bg-gray-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-gray-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-gray-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-gray-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-gray-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-gray-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-gray-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-gray-200" />
    </div>
  );
};

export default BoardList;
