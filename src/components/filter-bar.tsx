'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { OPPORTUNITY_TYPES, INDUSTRIES, YEAR_GROUPS } from '@/lib/constants';
import { useFilterStore } from '@/stores/filter-store';
import { Search, X, SlidersHorizontal, ChevronDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OpportunityType, Industry } from '@/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
          'flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px] transition-colors cursor-pointer',
          active
            ? 'border-white/[0.1] bg-white/[0.04] text-zinc-300'
            : 'border-white/[0.04] text-zinc-500 hover:border-white/[0.08] hover:text-zinc-400'
        )}
      >
        {label}
        {count !== undefined && count > 0 && (
          <span className="ml-0.5 text-[11px] text-zinc-500">
            {count}
          </span>
        )}
        <ChevronDown className="h-3 w-3 text-zinc-600" />
      </PopoverTrigger>
      <PopoverContent
        className="w-52 border-white/[0.06] bg-[#18181F] p-1.5"
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
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
        <Input
          placeholder="Search companies, roles, tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 bg-[#111118] border-white/[0.04] pl-9 text-[13px] text-zinc-300 placeholder:text-zinc-700 focus:border-white/[0.1] focus:ring-0"
        />
      </div>

      {/* Desktop filters */}
      <div className="hidden md:flex items-center gap-1.5 flex-wrap">
        {/* Type filter */}
        <FilterPopover label="Type" active={types.length > 0} count={types.length}>
          <div className="space-y-0.5">
            {OPPORTUNITY_TYPES.map((type) => {
              const selected = types.includes(type.value as OpportunityType);
              return (
                <button
                  key={type.value}
                  onClick={() => toggleType(type.value as OpportunityType)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded px-2 py-1.5 text-[13px] transition-colors',
                    selected
                      ? 'bg-white/[0.06] text-zinc-200'
                      : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-400'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-3.5 w-3.5 items-center justify-center rounded-sm border transition-colors',
                      selected
                        ? 'border-zinc-500 bg-zinc-500'
                        : 'border-zinc-700'
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
          <div className="space-y-0.5">
            {INDUSTRIES.map((industry) => {
              const selected = industries.includes(
                industry.toLowerCase() as Industry
              );
              return (
                <button
                  key={industry}
                  onClick={() => toggleIndustry(industry)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded px-2 py-1.5 text-[13px] transition-colors',
                    selected
                      ? 'bg-white/[0.06] text-zinc-200'
                      : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-400'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-3.5 w-3.5 items-center justify-center rounded-sm border transition-colors',
                      selected
                        ? 'border-zinc-500 bg-zinc-500'
                        : 'border-zinc-700'
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
          <MapPin className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-600" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={cn(
              'h-[34px] w-28 rounded-md border bg-transparent pl-6 pr-2 text-[13px] text-zinc-400 placeholder:text-zinc-700 transition-colors outline-none',
              location
                ? 'border-white/[0.1]'
                : 'border-white/[0.04] hover:border-white/[0.08]'
            )}
          />
        </div>

        {/* Year group */}
        <FilterPopover
          label={
            yearGroup
              ? YEAR_GROUPS.find((y) => y.value === yearGroup)?.label || 'Year'
              : 'Year'
          }
          active={!!yearGroup}
        >
          <div className="space-y-0.5">
            <button
              onClick={() => setYearGroup(null)}
              className={cn(
                'flex w-full rounded px-2 py-1.5 text-[13px] transition-colors',
                !yearGroup
                  ? 'bg-white/[0.06] text-zinc-200'
                  : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-400'
              )}
            >
              All years
            </button>
            {YEAR_GROUPS.map((year) => (
              <button
                key={year.value}
                onClick={() => setYearGroup(year.value)}
                className={cn(
                  'flex w-full rounded px-2 py-1.5 text-[13px] transition-colors',
                  yearGroup === year.value
                    ? 'bg-white/[0.06] text-zinc-200'
                    : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-400'
                )}
              >
                {year.label}
              </button>
            ))}
          </div>
        </FilterPopover>

        {/* Open only toggle */}
        <div className="flex items-center gap-2 rounded-md border border-white/[0.04] px-2.5 py-1.5">
          <span className="text-[13px] text-zinc-500">Open only</span>
          <Switch
            checked={showOpen}
            onCheckedChange={setShowOpen}
            className="data-[state=checked]:bg-zinc-500 h-4 w-7"
          />
        </div>

        {/* Clear all */}
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-zinc-600 transition-colors hover:text-zinc-400"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* Mobile filter toggle */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className={cn(
            'flex items-center gap-2 rounded-md border px-3 py-2 text-[13px] transition-colors',
            activeFilterCount > 0
              ? 'border-white/[0.1] bg-white/[0.04] text-zinc-300'
              : 'border-white/[0.04] text-zinc-500'
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="text-[11px] text-zinc-500">
              {activeFilterCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2 rounded-md border border-white/[0.04] px-3 py-2">
          <span className="text-[13px] text-zinc-500">Open</span>
          <Switch
            checked={showOpen}
            onCheckedChange={setShowOpen}
            className="data-[state=checked]:bg-zinc-500 h-4 w-7"
          />
        </div>
      </div>

      {/* Mobile expanded filters */}
      {mobileExpanded && (
        <div className="md:hidden">
          <div className="space-y-3 rounded-lg border border-white/[0.04] bg-[#111118] p-3">
            {/* Type pills */}
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
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
                        'rounded-md px-2.5 py-1 text-xs transition-colors',
                        selected
                          ? 'bg-white/[0.08] text-zinc-300'
                          : 'bg-white/[0.03] text-zinc-600 hover:text-zinc-500'
                      )}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Industry pills */}
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
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
                        'rounded-md px-2.5 py-1 text-xs transition-colors',
                        selected
                          ? 'bg-white/[0.08] text-zinc-300'
                          : 'bg-white/[0.03] text-zinc-600 hover:text-zinc-500'
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
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                Location
              </p>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-600" />
                <input
                  type="text"
                  placeholder="e.g. London, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-8 w-full rounded-md border border-white/[0.04] bg-transparent pl-7 pr-2 text-[13px] text-zinc-400 placeholder:text-zinc-700 outline-none"
                />
              </div>
            </div>

            {/* Year group pills */}
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
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
                      'rounded-md px-2.5 py-1 text-xs transition-colors',
                      yearGroup === year.value
                        ? 'bg-white/[0.08] text-zinc-300'
                        : 'bg-white/[0.03] text-zinc-600 hover:text-zinc-500'
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
                className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
