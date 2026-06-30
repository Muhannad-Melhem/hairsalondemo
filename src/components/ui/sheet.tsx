"use client";

import { cn } from "@/lib/utils";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { X } from "lucide-react";

function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DrawerPrimitive.Root>
  );
}

function SheetTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return (
    <DrawerPrimitive.Trigger
      data-slot="sheet-trigger"
      className={cn("", className)}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "left",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Popup> & {
  side?: "left" | "right" | "top" | "bottom";
}) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        className="fixed inset-0 z-50 bg-black/50 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in data-[exiting]:fade-out"
      />
      <DrawerPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition-transform duration-200",
          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:slide-in-from-left data-[exiting]:slide-out-to-left",
          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:slide-in-from-right data-[exiting]:slide-out-to-right",
          side === "top" &&
            "inset-x-0 top-0 border-b data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:slide-in-from-top",
          side === "bottom" &&
            "inset-x-0 bottom-0 border-t data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:slide-in-from-bottom",
          className,
        )}
        {...props}
      >
        {children}
        <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DrawerPrimitive.Close>
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Portal>
  );
}

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
};
