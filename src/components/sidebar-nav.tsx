'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Kanban,
  Calendar,
  Settings,
  GraduationCap,
} from 'lucide-react';
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
      <Link href="/feed" className="mb-8 flex items-center gap-2.5 px-3 py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm shadow-indigo-500/25">
          <GraduationCap className="h-4 w-4 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-zinc-100">
            StudySuite
          </h1>
        </div>
      </Link>

      {/* Main navigation */}
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300'
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-500" />
              )}
              <item.icon
                className={cn(
                  'h-[18px] w-[18px] transition-colors',
                  isActive ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Separator */}
      <div className="mx-3 my-4 h-px bg-white/[0.04]" />

      {/* Bottom items */}
      <div className="space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300'
              )}
            >
              {isActive && (
                <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-500" />
              )}
              <item.icon
                className={cn(
                  'h-[18px] w-[18px] transition-colors',
                  isActive ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* User avatar */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04] cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white">
            BD
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-300">Ben</p>
            <p className="truncate text-xs text-zinc-600">CS Year 1</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
