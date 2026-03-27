export const OPPORTUNITY_TYPES = [
  { value: 'internship', label: 'Internship', color: '#3B82F6' },
  { value: 'spring-week', label: 'Spring Week', color: '#10B981' },
  { value: 'insight-week', label: 'Insight Week', color: '#8B5CF6' },
  { value: 'grad-scheme', label: 'Graduate Scheme', color: '#F59E0B' },
  { value: 'hackathon', label: 'Hackathon', color: '#EF4444' },
  { value: 'scholarship', label: 'Scholarship', color: '#EC4899' },
  { value: 'placement', label: 'Placement Year', color: '#06B6D4' },
  { value: 'job', label: 'Job', color: '#6366F1' },
] as const;

export const INDUSTRIES = [
  'Tech', 'Finance', 'Consulting', 'Law', 'Medicine',
  'Engineering', 'Government', 'Media', 'Retail', 'Energy', 'Other'
] as const;

export const YEAR_GROUPS = [
  { value: 1, label: 'Year 1' },
  { value: 2, label: 'Year 2' },
  { value: 3, label: 'Year 3' },
  { value: 4, label: 'Year 4 / Masters' },
  { value: 5, label: 'PhD' },
] as const;
