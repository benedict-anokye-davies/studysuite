'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Kanban, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/feed', label: 'Home', icon: Home },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/applications', label: 'Applications', icon: Kanban },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
];

const bottomItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col px-3 py-4">
      {/* Logo */}
      <Link href="/feed" className="mb-8 flex items-center px-3 py-1">
        <h1 className="text-[15px] font-semibold tracking-tight text-zinc-200">
          StudySuite
        </h1>
      </Link>

      {/* Main navigation */}
      <div className="space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-100',
                isActive
                  ? 'bg-white/[0.06] text-zinc-100'
                  : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300'
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4',
                  isActive
                    ? 'text-zinc-300'
                    : 'text-zinc-600 group-hover:text-zinc-400'
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom items */}
      <div className="space-y-0.5">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-100',
                isActive
                  ? 'bg-white/[0.06] text-zinc-100'
                  : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300'
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4',
                  isActive
                    ? 'text-zinc-300'
                    : 'text-zinc-600 group-hover:text-zinc-400'
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
