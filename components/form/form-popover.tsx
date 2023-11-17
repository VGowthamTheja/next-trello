"use client";

import React from "react";
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
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "success");
      toast.success("Board created!");
    },
    onError: (error) => {
      console.log(error, "error");
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
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
        <PopoverClose>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-gray-600 hover:text-rose-500 transition"
            variant={"ghost"}
          >
            <X className="h-6 w-6" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
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
