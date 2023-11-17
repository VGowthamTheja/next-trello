"use client";

import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "success");
    },
    onError(error) {
      console.log(error, "error");
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };
  return (
    <form action={onSubmit} className="flex space-x-2">
      <div className="flex flex-col space-y-2 items-center">
        <FormInput
          id="title"
          label="Board Title"
          type="text"
          placeholder="Board title"
          required
          errors={fieldErrors}
        />
      </div>
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};
