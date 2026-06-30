"use client";

import { cn } from "@/lib/utils";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDown } from "lucide-react";

function Select({
  value,
  onValueChange,
  children,
  ...props
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={(v) => v !== null && onValueChange?.(v)}
      {...props}
    >
      {children}
    </SelectPrimitive.Root>
  );
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-xs",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("text-sm", className)}
      {...props}
    />
  );
}

function SelectPopup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Popup>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Popup
        data-slot="select-popup"
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md",
          "data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in data-[exiting]:fade-out data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95",
          className,
        )}
        {...props}
      />
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none",
        "select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          className="size-4"
        >
          <path
            d="M11.4669 3.72684C11.7558 4.01574 11.7558 4.48061 11.4669 4.76951L7.06694 9.16951C6.77804 9.45841 6.31317 9.45841 6.02427 9.16951L3.62427 6.76951C3.33538 6.48061 3.33538 6.01574 3.62427 5.72684C3.91317 5.43795 4.37804 5.43795 4.66694 5.72684L6.5456 7.6055L10.4243 3.72684C10.7132 3.43795 11.178 3.43795 11.4669 3.72684Z"
            fill="currentColor"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("", className)}
      {...props}
    />
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
  SelectGroup,
  SelectLabel,
};
