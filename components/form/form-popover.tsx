"use client";

import React, { ElementRef, useRef } from "react";
import { X } from "lucide-react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { useRouter } from "next/navigation";

interface FormPopOverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

const FormPopOver = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
}: FormPopOverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-gray-600 hover:text-rose-500 transition"
            variant={"ghost"}
          >
            <X className="h-6 w-6" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              errors={fieldErrors}
              id="title"
              label="Board title"
              type="text"
            />
          </div>
          <FormSubmit className="w-full">Create board</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopOver;
