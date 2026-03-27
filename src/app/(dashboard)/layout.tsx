import { SidebarNav } from "@/components/sidebar-nav";
import { MobileNav } from "@/components/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-white/[0.04] bg-[#0E0E14] md:block">
        <SidebarNav />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile header */}
        <header className="flex h-14 items-center gap-4 border-b border-white/[0.04] bg-[#0E0E14] px-4 md:hidden">
          <MobileNav />
          <span className="text-lg font-bold tracking-tight text-zinc-100">
            StudySuite
          </span>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
