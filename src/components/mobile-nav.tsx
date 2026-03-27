'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { SidebarNav } from './sidebar-nav';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 transition-colors hover:bg-white/[0.03] hover:text-zinc-300 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-56 border-white/[0.04] bg-[#0E0E14] p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div onClick={() => setOpen(false)}>
          <SidebarNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
