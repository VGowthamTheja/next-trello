"use client";

import React from "react";
import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormErrors = ({ errors, id }: FormErrorsProps) => {
  if (!errors) return null;

  return (
    <div
      id={`${id}-errors`}
      aria-live="polite"
      className="mt-2 text-sm text-rose-600"
    >
      {errors?.[id]?.map((error, index) => (
        <div
          key={error}
          className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
        >
          <XCircle className="w-4 h-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
