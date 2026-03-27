'use client';

import { useMemo } from 'react';
import { OpportunityCard } from '@/components/opportunity-card';
import { FilterBar } from '@/components/filter-bar';
import { exploreOpportunities } from '@/lib/mock-data';
import { useFilterStore } from '@/stores/filter-store';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import type { OpportunityType, Industry } from '@/types';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

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
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            Explore
          </h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Browse all opportunities across industries and roles
        </p>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          <span className="font-semibold text-zinc-300">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'opportunity' : 'opportunities'} found
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04]">
            <Compass className="h-6 w-6 text-zinc-600" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-300">
            No opportunities match
          </h3>
          <p className="max-w-xs text-sm text-zinc-500">
            Try adjusting your filters or search terms to find what you are
            looking for.
          </p>
        </div>
      )}
    </div>
  );
}
