'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn, formatDeadline, getDeadlineUrgency } from '@/lib/utils';
import { OPPORTUNITY_TYPES } from '@/lib/constants';
import { getCompanyInitials, getCompanyColor } from '@/lib/mock-data';
import type { Opportunity } from '@/types';
import { MapPin, Clock, Bookmark, ExternalLink, Banknote } from 'lucide-react';

// Map company slugs to logo filenames
const COMPANY_LOGOS: Record<string, string> = {
  gs: '/logos/goldman-sachs.png',
  google: '/logos/google.png',
  janestreet: '/logos/jane-street.png',
  nhs: '/logos/nhs-digital.png',
  deloitte: '/logos/deloitte.png',
  bae: '/logos/bae-systems.png',
  revolut: '/logos/revolut.png',
  bloomberg: '/logos/bloomberg.png',
  palantir: '/logos/palantir.png',
  citadel: '/logos/citadel.png',
  jpmorgan: '/logos/jp-morgan.png',
  mckinsey: '/logos/mckinsey.png',
  amazon: '/logos/amazon.png',
  dyson: '/logos/dyson.png',
  gresearch: '/logos/g-research.png',
};

function CompanyLogo({
  companyId,
  companyName,
  size = 'md',
}: {
  companyId: string;
  companyName: string;
  size?: 'sm' | 'md';
}) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = COMPANY_LOGOS[companyId];
  const initials = getCompanyInitials(companyName);
  const bgColor = getCompanyColor(companyId);
  const px = size === 'sm' ? 28 : 36;
  const classes =
    size === 'sm'
      ? 'h-7 w-7 rounded-md'
      : 'h-9 w-9 rounded-lg';

  if (logoSrc && !imgError) {
    return (
      <div
        className={cn(
          classes,
          'shrink-0 overflow-hidden bg-white flex items-center justify-center p-1'
        )}
      >
        <Image
          src={logoSrc}
          alt={`${companyName} logo`}
          width={px}
          height={px}
          className="object-contain"
          onError={() => setImgError(true)}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        classes,
        'shrink-0 flex items-center justify-center text-[10px] font-semibold text-white'
      )}
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  );
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  variant?: 'compact' | 'expanded';
}

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

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'group flex items-center gap-3 rounded-lg px-3 py-2.5',
          'border border-white/[0.04] bg-[#111118]',
          'hover:bg-[#151520] transition-colors duration-100 cursor-pointer'
        )}
      >
        <CompanyLogo
          companyId={opportunity.company_id}
          companyName={opportunity.company.name}
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] text-zinc-300">
            <span className="text-zinc-500">{opportunity.company.name}</span>
            <span className="mx-1.5 text-zinc-700">/</span>
            <span className="font-medium text-zinc-200">
              {opportunity.title}
            </span>
          </p>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-600">
            <span>{opportunity.location}</span>
            {opportunity.salary && (
              <>
                <span className="text-zinc-700">·</span>
                <span>{opportunity.salary}</span>
              </>
            )}
          </div>
        </div>
        {typeConfig && (
          <span className="shrink-0 rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-zinc-500">
            {typeConfig.label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group flex flex-col rounded-lg p-4',
        'border border-white/[0.04] bg-[#111118]',
        'hover:border-white/[0.08] hover:bg-[#141420]',
        'transition-colors duration-100 cursor-pointer h-full'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <CompanyLogo
            companyId={opportunity.company_id}
            companyName={opportunity.company.name}
          />
          <div className="min-w-0">
            <p className="text-[13px] text-zinc-500">
              {opportunity.company.name}
            </p>
            <h3 className="text-sm font-medium leading-snug text-zinc-200">
              {opportunity.title}
            </h3>
          </div>
        </div>
        {typeConfig && (
          <span className="shrink-0 mt-0.5 rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-zinc-500">
            {typeConfig.label}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600">
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
        <div className="mt-3 flex flex-wrap gap-1">
          {opportunity.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-white/[0.03] px-1.5 py-0.5 text-[11px] text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-3">
        {opportunity.deadline ? (
          <span
            className={cn(
              'flex items-center gap-1.5 text-xs',
              urgency === 'red' && 'text-red-400/80',
              urgency === 'amber' && 'text-amber-400/80',
              urgency === 'green' && 'text-zinc-500',
              urgency === 'grey' && 'text-zinc-600'
            )}
          >
            <Clock className="h-3 w-3" />
            {formatDeadline(opportunity.deadline)}
          </span>
        ) : (
          <span className="text-xs text-zinc-600">Rolling</span>
        )}

        <div className="flex items-center gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked(!bookmarked);
            }}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              bookmarked
                ? 'text-zinc-300 bg-white/[0.06]'
                : 'text-zinc-700 hover:text-zinc-500 hover:bg-white/[0.03]'
            )}
            aria-label={`Bookmark ${opportunity.title} at ${opportunity.company.name}`}
          >
            <Bookmark
              className="h-3.5 w-3.5"
              fill={bookmarked ? 'currentColor' : 'none'}
            />
          </button>
          <a
            href={opportunity.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-md p-1.5 text-zinc-700 transition-colors hover:text-zinc-500 hover:bg-white/[0.03]"
            aria-label={`Apply to ${opportunity.title}`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
