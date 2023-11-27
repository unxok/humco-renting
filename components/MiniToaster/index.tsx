"use client";

import { useEffect } from "react";
import { toast } from "../ui/use-toast";

export const MiniToaster = ({
  title,
  description,
  variant,
}: {
  title?: string;
  description: string;
  variant: string;
}) => {
  useEffect(() => {
    toast({
      title: title,
      description: description,
      // @ts-ignore TODO figure out how to type this properly
      variant: variant,
    });
  }, []);
};
