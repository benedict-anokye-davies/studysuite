'use client';

import { OpportunityCard } from '@/components/opportunity-card';
import { feedOpportunities } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            For You
          </h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Opportunities matched to your profile and interests
        </p>
      </div>

      {/* Closing Soon Section */}
      {closingSoon.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-red-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400">
              Closing Soon
            </h3>
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
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

      {/* Main Feed */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Recommended
          </h3>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {openOpportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
