import { create } from 'zustand';
import type { OpportunityType, Industry } from '@/types';

interface FilterState {
  types: OpportunityType[];
  industries: Industry[];
  location: string;
  yearGroup: number | null;
  searchQuery: string;
  showOpen: boolean;
  setTypes: (types: OpportunityType[]) => void;
  setIndustries: (industries: Industry[]) => void;
  setLocation: (location: string) => void;
  setYearGroup: (year: number | null) => void;
  setSearchQuery: (query: string) => void;
  setShowOpen: (show: boolean) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  types: [],
  industries: [],
  location: '',
  yearGroup: null,
  searchQuery: '',
  showOpen: true,
  setTypes: (types) => set({ types }),
  setIndustries: (industries) => set({ industries }),
  setLocation: (location) => set({ location }),
  setYearGroup: (yearGroup) => set({ yearGroup }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setShowOpen: (showOpen) => set({ showOpen }),
  resetFilters: () => set({
    types: [],
    industries: [],
    location: '',
    yearGroup: null,
    searchQuery: '',
    showOpen: true,
  }),
}));
