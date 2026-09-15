"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type IActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
} | null;

export function useActionFeedback(
  state: IActionResult,
  onSuccess?: () => void,
) {
  const [previous, setPrevious] = useState(state);

  if (state !== previous) {
    setPrevious(state);

    if (state?.success) {
      onSuccess?.();
    }
  }

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
    } else if (!state.errors) {
      toast.error(state.message);
    }
  }, [state]);
}
