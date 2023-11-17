"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const { isOpen, onClose, onOpen } = useMobileSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        size={"sm"}
        variant={"ghost"}
        className="block md:hidden items-center justify-center mr-2"
      >
        <Menu className="w-5 h-5" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="p-2 pt-10" side={"left"}>
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
