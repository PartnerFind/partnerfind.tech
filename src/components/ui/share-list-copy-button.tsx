"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";

interface CopyButtonProps extends ButtonProps {
  value: string;
  src?: string;
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
}

export function ShareListCopyButton({ value, className, src, variant = "ghost", ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="lg"
      variant={variant}
      onClick={() => {
        copyToClipboardWithMeta(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <h1>Share this List! (Copy)</h1>}
    </Button>
  );
}
