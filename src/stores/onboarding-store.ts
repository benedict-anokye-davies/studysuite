import { create } from 'zustand';
import type { OpportunityType, Industry } from '@/types';

interface OnboardingState {
  step: number;
  university: string;
  degreeSubject: string;
  yearGroup: number | null;
  careerInterests: string[];
  industryPreferences: Industry[];
  opportunityTypes: OpportunityType[];
  locationPreferences: string[];
  setStep: (step: number) => void;
  setUniversity: (university: string) => void;
  setDegreeSubject: (subject: string) => void;
  setYearGroup: (year: number | null) => void;
  setCareerInterests: (interests: string[]) => void;
  setIndustryPreferences: (industries: Industry[]) => void;
  setOpportunityTypes: (types: OpportunityType[]) => void;
  setLocationPreferences: (locations: string[]) => void;
  reset: () => void;
}

const initialState = {
  step: 0,
  university: '',
  degreeSubject: '',
  yearGroup: null as number | null,
  careerInterests: [] as string[],
  industryPreferences: [] as Industry[],
  opportunityTypes: [] as OpportunityType[],
  locationPreferences: [] as string[],
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setUniversity: (university) => set({ university }),
  setDegreeSubject: (degreeSubject) => set({ degreeSubject }),
  setYearGroup: (yearGroup) => set({ yearGroup }),
  setCareerInterests: (careerInterests) => set({ careerInterests }),
  setIndustryPreferences: (industryPreferences) => set({ industryPreferences }),
  setOpportunityTypes: (opportunityTypes) => set({ opportunityTypes }),
  setLocationPreferences: (locationPreferences) => set({ locationPreferences }),
  reset: () => set(initialState),
}));
