'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn, formatDeadline, getDeadlineUrgency } from '@/lib/utils';
import { OPPORTUNITY_TYPES } from '@/lib/constants';
import { getCompanyInitials, getCompanyColor } from '@/lib/mock-data';
import type { Opportunity } from '@/types';
import {
  MapPin,
  Clock,
  Bookmark,
  ExternalLink,
  Banknote,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface OpportunityCardProps {
  opportunity: Opportunity;
  variant?: 'compact' | 'expanded';
}

const urgencyConfig = {
  green: {
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
    ring: '',
  },
  amber: {
    text: 'text-amber-400',
    dot: 'bg-amber-500',
    ring: 'ring-1 ring-amber-500/20',
  },
  red: {
    text: 'text-red-400',
    dot: 'bg-red-500',
    ring: 'ring-1 ring-red-500/30',
  },
  grey: {
    text: 'text-zinc-500',
    dot: 'bg-zinc-500',
    ring: '',
  },
};

export function OpportunityCard({
  opportunity,
  variant = 'expanded',
}: OpportunityCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const typeConfig = OPPORTUNITY_TYPES.find(
    (t) => t.value === opportunity.type
  );
  const urgency = opportunity.deadline
    ? getDeadlineUrgency(opportunity.deadline)
    : 'grey';
  const urgencyStyle = urgencyConfig[urgency];
  const initials = getCompanyInitials(opportunity.company.name);
  const bgColor = getCompanyColor(opportunity.company_id);

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'group flex items-start gap-3 rounded-xl p-3',
          'border border-white/[0.06] bg-[#111118]',
          'hover:border-indigo-500/30 hover:bg-[#18181F]',
          'transition-all duration-150 cursor-pointer'
        )}
      >
        <div
          className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-300">
                {opportunity.company.name}{' '}
                <span className="text-zinc-500">·</span>{' '}
                <span className="text-zinc-100 font-semibold">
                  {opportunity.title}
                </span>
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {opportunity.location}
                </span>
                {opportunity.salary && (
                  <>
                    <span>·</span>
                    <span>{opportunity.salary}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {typeConfig && (
                <Badge
                  className="text-[10px] font-semibold tracking-wide border-0"
                  style={{
                    backgroundColor: typeConfig.color + '18',
                    color: typeConfig.color,
                  }}
                >
                  {typeConfig.label}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className={cn(
        'group flex flex-col gap-3 rounded-xl p-4',
        'border border-white/[0.06] bg-[#111118]',
        'hover:border-indigo-500/30 hover:bg-[#15151E]',
        'hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]',
        'transition-all duration-200 cursor-pointer h-full',
        urgencyStyle.ring
      )}
    >
      {/* Header: Logo + Badge */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-zinc-400">{opportunity.company.name}</p>
            <h3 className="text-[15px] font-semibold leading-tight text-zinc-100">
              {opportunity.title}
            </h3>
          </div>
        </div>
        {typeConfig && (
          <Badge
            className="shrink-0 text-[10px] font-semibold tracking-wide border-0"
            style={{
              backgroundColor: typeConfig.color + '18',
              color: typeConfig.color,
            }}
          >
            {typeConfig.label}
          </Badge>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.04]" />

      {/* Details */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {opportunity.location}
        </span>
        {opportunity.salary && (
          <span className="flex items-center gap-1">
            <Banknote className="h-3 w-3" />
            {opportunity.salary}
          </span>
        )}
      </div>

      {/* Tags */}
      {opportunity.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {opportunity.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: Deadline + Bookmark */}
      <div className="mt-auto flex items-center justify-between pt-1">
        {opportunity.deadline ? (
          <div className={cn('flex items-center gap-1.5 text-xs font-medium', urgencyStyle.text)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', urgencyStyle.dot)} />
            <Clock className="h-3 w-3" />
            {formatDeadline(opportunity.deadline)}
          </div>
        ) : (
          <span className="text-xs text-zinc-600">Rolling applications</span>
        )}

        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked(!bookmarked);
            }}
            className={cn(
              'rounded-lg p-1.5 transition-colors',
              bookmarked
                ? 'text-indigo-400 bg-indigo-500/10'
                : 'text-zinc-600 hover:text-zinc-400 hover:bg-white/[0.04]'
            )}
            aria-label={`Bookmark ${opportunity.title} at ${opportunity.company.name}`}
          >
            <Bookmark
              className="h-4 w-4"
              fill={bookmarked ? 'currentColor' : 'none'}
            />
          </motion.button>
          <a
            href={opportunity.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-zinc-600 transition-colors hover:text-zinc-400 hover:bg-white/[0.04]"
            aria-label={`Apply to ${opportunity.title}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
