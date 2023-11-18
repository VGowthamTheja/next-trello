"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "default"
    | "outline"
    | "ghost"
    | "link";
}

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant="primary",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      className={cn(className)}
      variant={variant}
      size={"sm"}
    >
      {children}
    </Button>
  );
};
