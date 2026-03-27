export type OpportunityType = 'internship' | 'spring-week' | 'insight-week' | 'grad-scheme' | 'hackathon' | 'scholarship' | 'placement' | 'job';
export type ApplicationStatus = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';
export type Industry = 'tech' | 'finance' | 'consulting' | 'law' | 'medicine' | 'engineering' | 'government' | 'media' | 'retail' | 'energy' | 'other';

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  industry: Industry;
  size: 'startup' | 'sme' | 'large' | 'enterprise';
  location: string;
  careers_url?: string;
  description?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  company: Company;
  company_id: string;
  location: string;
  salary?: string;
  deadline?: string;
  url: string;
  description?: string;
  year_groups: number[];
  degree_subjects?: string[];
  tags: string[];
  created_at: string;
  is_open: boolean;
}

export interface Application {
  id: string;
  user_id: string;
  opportunity_id: string;
  opportunity: Opportunity;
  status: ApplicationStatus;
  notes?: string;
  applied_at?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  university?: string;
  degree_subject?: string;
  year_group?: number;
  career_interests: string[];
  industry_preferences: Industry[];
  opportunity_types: OpportunityType[];
  location_preferences: string[];
  onboarding_complete: boolean;
}
