"use client";

import { List } from "@prisma/client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess(result) {
      closeRef.current?.click();
      toast.success(`List "${result.title}" deleted`);
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto absolute top-2 right-2 text-neutral-600 hover:text-rose-600 transition"
            variant={"ghost"}
          >
            <X className="w-5 h-5" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card
        </Button>
        <form>
          <input type="hidden" name="id" id="id" value={data.id} />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={data.boardId}
          />
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Copy list
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input type="hidden" name="id" id="id" value={data.id} />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={data.boardId}
          />
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-rose-50 hover:text-rose-600 transition"
            variant="ghost"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
