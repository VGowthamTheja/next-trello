"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormErrors from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      disabled,
      errors,
      placeholder,
      required,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label htmlFor={id} className="text-xs font-medium text-gray-700">
              {label}
            </Label>
          )}
          <Input
            onBlur={onBlur}
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            disabled={disabled || pending}
            required={required}
            defaultValue={defaultValue}
            className={cn(
              "block w-full text-sm px-2 py-1 h-7 rounded-md shadow-sm",
              errors?.[id] ? "border-red-300" : "border-gray-300",
              className
            )}
            aria-describedby={errors?.[id] ? `${id}-error` : undefined}
            name={id}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
