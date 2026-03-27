'use client';

import { useMemo } from 'react';
import { OpportunityCard } from '@/components/opportunity-card';
import { FilterBar } from '@/components/filter-bar';
import { exploreOpportunities } from '@/lib/mock-data';
import { useFilterStore } from '@/stores/filter-store';
import { Search } from 'lucide-react';
import type { OpportunityType, Industry } from '@/types';

export default function ExplorePage() {
  const { types, industries, location, yearGroup, searchQuery, showOpen } =
    useFilterStore();

  const filtered = useMemo(() => {
    return exploreOpportunities.filter((opp) => {
      if (showOpen && !opp.is_open) return false;

      if (types.length > 0 && !types.includes(opp.type as OpportunityType))
        return false;

      if (
        industries.length > 0 &&
        !industries.includes(opp.company.industry as Industry)
      )
        return false;

      if (
        location &&
        !opp.location.toLowerCase().includes(location.toLowerCase())
      )
        return false;

      if (yearGroup && !opp.year_groups.includes(yearGroup)) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          opp.title.toLowerCase().includes(q) ||
          opp.company.name.toLowerCase().includes(q) ||
          opp.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          opp.location.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [types, industries, location, yearGroup, searchQuery, showOpen]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-zinc-200">Explore</h2>
        <p className="mt-0.5 text-sm text-zinc-600">
          Browse all opportunities across industries and roles
        </p>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Results count */}
      <div>
        <p className="text-xs text-zinc-600">
          <span className="text-zinc-400">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <Search className="h-8 w-8 text-zinc-700" />
          <h3 className="text-sm font-medium text-zinc-300">
            No results
          </h3>
          <p className="max-w-xs text-xs text-zinc-600">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
}
