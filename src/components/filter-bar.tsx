'use client';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { OPPORTUNITY_TYPES, INDUSTRIES } from '@/lib/constants';
import { useFilterStore } from '@/stores/filter-store';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OpportunityType, Industry } from '@/types';

export function FilterBar() {
  const {
    types,
    searchQuery,
    setTypes,
    setSearchQuery,
    resetFilters,
  } = useFilterStore();

  const toggleType = (value: OpportunityType) => {
    setTypes(
      types.includes(value) ? types.filter((t) => t !== value) : [...types, value]
    );
  };

  const hasFilters = types.length > 0 || searchQuery.length > 0;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search opportunities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {OPPORTUNITY_TYPES.map((type) => (
          <Badge
            key={type.value}
            variant={types.includes(type.value as OpportunityType) ? 'default' : 'outline'}
            className="cursor-pointer transition-colors"
            onClick={() => toggleType(type.value as OpportunityType)}
          >
            {type.label}
          </Badge>
        ))}
        {hasFilters && (
          <Badge
            variant="destructive"
            className="cursor-pointer"
            onClick={resetFilters}
          >
            <X className="mr-1 h-3 w-3" />
            Clear
          </Badge>
        )}
      </div>
    </div>
  );
}
