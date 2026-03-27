'use client';

import { OpportunityCard } from '@/components/opportunity-card';
import { feedOpportunities } from '@/lib/mock-data';
import { Inbox } from 'lucide-react';

export default function FeedPage() {
  const openOpportunities = feedOpportunities.filter((o) => o.is_open);
  const closingSoon = openOpportunities
    .filter((o) => {
      if (!o.deadline) return false;
      const days = Math.ceil(
        (new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      return days > 0 && days <= 7;
    })
    .sort(
      (a, b) =>
        new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()
    );

  const recommended = openOpportunities.filter(
    (o) => !closingSoon.find((c) => c.id === o.id)
  );

  if (openOpportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Inbox className="h-10 w-10 text-zinc-700" />
        <h2 className="mt-4 text-lg font-medium text-zinc-300">
          No opportunities yet
        </h2>
        <p className="mt-1 max-w-xs text-sm text-zinc-600">
          New opportunities will appear here as they are added. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-zinc-200">Feed</h2>
        <p className="mt-0.5 text-sm text-zinc-600">
          Opportunities matched to your profile
        </p>
      </div>

      {/* Closing Soon */}
      {closingSoon.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Closing soon
            </h3>
            <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {closingSoon.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recommended */}
      {recommended.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Recommended
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
