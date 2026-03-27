'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Opportunity } from '@/types';

export function useOpportunities() {
  const supabase = createClient();

  return useQuery<Opportunity[]>({
    queryKey: ['opportunities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*, company:companies(*)')
        .eq('is_open', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });
}
