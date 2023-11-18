"use client";

import { useState, useRef, ElementRef } from "react";

import { List } from "@prisma/client";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";
import { toast } from "sonner";
import ListOptions from "./list-options";

interface ListHeaderProps {
  data: List;
}

const ListHeader = ({ data }: ListHeaderProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const { execute } = useAction(updateList, {
    onSuccess(result) {
      toast.success(`Renamed to ${result.title}`);
      setTitle(result.title);
      disableEditing();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title !== data.title) {
      execute({ id, boardId, title });
    } else {
      disableEditing();
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
    disableEditing();
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
      disableEditing();
    }
  });

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
          <input type="hidden" id="id" hidden name="id" value={data.id} />
          <input
            type="hidden"
            id="boardId"
            hidden
            name="boardId"
            value={data.boardId}
          />
          <FormInput
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            defaultValue={title}
            placeholder="Enter list title..."
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-[7px] py-1 h-7 font-medium border-transparent hoevr:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={() => {}} />
    </div>
  );
};

export default ListHeader;
