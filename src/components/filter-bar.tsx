'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { OPPORTUNITY_TYPES, INDUSTRIES, YEAR_GROUPS } from '@/lib/constants';
import { useFilterStore } from '@/stores/filter-store';
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OpportunityType, Industry } from '@/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { motion, AnimatePresence } from 'framer-motion';

function FilterPopover({
  label,
  active,
  count,
  children,
}: {
  label: string;
  active: boolean;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors cursor-pointer',
          active
            ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400'
            : 'border-white/[0.06] bg-[#18181F] text-zinc-400 hover:border-white/10 hover:text-zinc-300'
        )}
      >
        {label}
        {count !== undefined && count > 0 && (
          <span className="ml-1 rounded-full bg-indigo-500/20 px-1.5 text-[10px] font-semibold">
            {count}
          </span>
        )}
        <ChevronDown className="h-3 w-3" />
      </PopoverTrigger>
      <PopoverContent
        className="w-56 border-white/[0.06] bg-[#18181F] p-2"
        align="start"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

export function FilterBar() {
  const {
    types,
    industries,
    location,
    yearGroup,
    searchQuery,
    showOpen,
    setTypes,
    setIndustries,
    setLocation,
    setYearGroup,
    setSearchQuery,
    setShowOpen,
    resetFilters,
  } = useFilterStore();

  const [mobileExpanded, setMobileExpanded] = useState(false);

  const toggleType = (value: OpportunityType) => {
    setTypes(
      types.includes(value)
        ? types.filter((t) => t !== value)
        : [...types, value]
    );
  };

  const toggleIndustry = (value: string) => {
    const industryValue = value.toLowerCase() as Industry;
    setIndustries(
      industries.includes(industryValue)
        ? industries.filter((i) => i !== industryValue)
        : [...industries, industryValue]
    );
  };

  const activeFilterCount =
    types.length +
    industries.length +
    (location ? 1 : 0) +
    (yearGroup ? 1 : 0) +
    (showOpen ? 0 : 1);

  const hasFilters = activeFilterCount > 0 || searchQuery.length > 0;

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          placeholder="Search opportunities, companies, roles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#111118] border-white/[0.06] pl-10 text-zinc-200 placeholder:text-zinc-600 focus:border-indigo-500/40 focus:ring-indigo-500/20"
        />
      </div>

      {/* Desktop filters */}
      <div className="hidden md:flex items-center gap-2 flex-wrap">
        {/* Type filter */}
        <FilterPopover label="Type" active={types.length > 0} count={types.length}>
          <div className="space-y-1">
            {OPPORTUNITY_TYPES.map((type) => {
              const selected = types.includes(type.value as OpportunityType);
              return (
                <button
                  key={type.value}
                  onClick={() => toggleType(type.value as OpportunityType)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                    selected
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-300'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-3 w-3 items-center justify-center rounded-sm border transition-colors',
                      selected
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-zinc-600'
                    )}
                  >
                    {selected && (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-2.5 w-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </span>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  {type.label}
                </button>
              );
            })}
          </div>
        </FilterPopover>

        {/* Industry filter */}
        <FilterPopover
          label="Industry"
          active={industries.length > 0}
          count={industries.length}
        >
          <div className="space-y-1">
            {INDUSTRIES.map((industry) => {
              const selected = industries.includes(
                industry.toLowerCase() as Industry
              );
              return (
                <button
                  key={industry}
                  onClick={() => toggleIndustry(industry)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                    selected
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-300'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-3 w-3 items-center justify-center rounded-sm border transition-colors',
                      selected
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-zinc-600'
                    )}
                  >
                    {selected && (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-2.5 w-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </span>
                  {industry}
                </button>
              );
            })}
          </div>
        </FilterPopover>

        {/* Location input */}
        <div className="relative">
          <MapPin className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={cn(
              'h-8 w-32 rounded-lg border bg-[#18181F] pl-7 pr-2 text-sm text-zinc-300 placeholder:text-zinc-600 transition-colors outline-none',
              location
                ? 'border-indigo-500/40'
                : 'border-white/[0.06] hover:border-white/10'
            )}
          />
        </div>

        {/* Year group */}
        <FilterPopover
          label={
            yearGroup
              ? YEAR_GROUPS.find((y) => y.value === yearGroup)?.label || 'Year Group'
              : 'Year Group'
          }
          active={!!yearGroup}
        >
          <div className="space-y-1">
            <button
              onClick={() => setYearGroup(null)}
              className={cn(
                'flex w-full rounded-md px-2 py-1.5 text-sm transition-colors',
                !yearGroup
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-300'
              )}
            >
              All years
            </button>
            {YEAR_GROUPS.map((year) => (
              <button
                key={year.value}
                onClick={() => setYearGroup(year.value)}
                className={cn(
                  'flex w-full rounded-md px-2 py-1.5 text-sm transition-colors',
                  yearGroup === year.value
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-300'
                )}
              >
                {year.label}
              </button>
            ))}
          </div>
        </FilterPopover>

        {/* Open only toggle */}
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#18181F] px-3 py-1.5">
          <span className="text-sm text-zinc-400">Open only</span>
          <Switch
            checked={showOpen}
            onCheckedChange={setShowOpen}
            className="data-[state=checked]:bg-indigo-500 h-4 w-7"
          />
        </div>

        {/* Clear all */}
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-zinc-500 transition-colors hover:text-red-400"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Mobile filter toggle */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className={cn(
            'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
            activeFilterCount > 0
              ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400'
              : 'border-white/[0.06] bg-[#18181F] text-zinc-400'
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="h-5 w-5 rounded-full bg-indigo-500 p-0 text-[10px] text-white flex items-center justify-center">
              {activeFilterCount}
            </Badge>
          )}
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#18181F] px-3 py-2">
          <span className="text-sm text-zinc-400">Open</span>
          <Switch
            checked={showOpen}
            onCheckedChange={setShowOpen}
            className="data-[state=checked]:bg-indigo-500 h-4 w-7"
          />
        </div>
      </div>

      {/* Mobile expanded filters */}
      <AnimatePresence>
        {mobileExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:hidden"
          >
            <div className="space-y-3 rounded-xl border border-white/[0.06] bg-[#111118] p-3">
              {/* Type pills */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {OPPORTUNITY_TYPES.map((type) => {
                    const selected = types.includes(
                      type.value as OpportunityType
                    );
                    return (
                      <button
                        key={type.value}
                        onClick={() =>
                          toggleType(type.value as OpportunityType)
                        }
                        className={cn(
                          'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                          selected
                            ? 'text-white'
                            : 'bg-white/[0.04] text-zinc-500 hover:text-zinc-400'
                        )}
                        style={
                          selected
                            ? {
                                backgroundColor: type.color + '25',
                                color: type.color,
                              }
                            : undefined
                        }
                      >
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Industry pills */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Industry
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {INDUSTRIES.map((industry) => {
                    const selected = industries.includes(
                      industry.toLowerCase() as Industry
                    );
                    return (
                      <button
                        key={industry}
                        onClick={() => toggleIndustry(industry)}
                        className={cn(
                          'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                          selected
                            ? 'bg-indigo-500/15 text-indigo-400'
                            : 'bg-white/[0.04] text-zinc-500 hover:text-zinc-400'
                        )}
                      >
                        {industry}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Location
                </p>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="e.g. London, Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-8 w-full rounded-lg border border-white/[0.06] bg-[#18181F] pl-7 pr-2 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none"
                  />
                </div>
              </div>

              {/* Year group pills */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Year Group
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {YEAR_GROUPS.map((year) => (
                    <button
                      key={year.value}
                      onClick={() =>
                        setYearGroup(
                          yearGroup === year.value ? null : year.value
                        )
                      }
                      className={cn(
                        'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                        yearGroup === year.value
                          ? 'bg-indigo-500/15 text-indigo-400'
                          : 'bg-white/[0.04] text-zinc-500 hover:text-zinc-400'
                      )}
                    >
                      {year.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasFilters && (
                <button
                  onClick={() => {
                    resetFilters();
                    setMobileExpanded(false);
                  }}
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
