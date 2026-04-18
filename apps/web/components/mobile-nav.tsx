import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import React from "react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        <div
          className={cn(
            "transition-all",
            open ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        >
          <XIcon />
        </div>
        <div
          className={cn(
            "absolute transition-all",
            open ? "scale-0 opacity-0" : "scale-100 opacity-100",
          )}
        >
          <MenuIcon />
        </div>
      </Button>
      {open && (
        <Portal className="top-14">
          <PortalBackdrop />
          <div
            className={cn(
              "size-full overflow-y-auto p-4",
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="mt-5 flex flex-col gap-2">
              <Button className="w-full" variant="outline">
                Sign In
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
