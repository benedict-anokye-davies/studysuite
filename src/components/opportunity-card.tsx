'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatDeadline, getDeadlineUrgency } from '@/lib/utils';
import { OPPORTUNITY_TYPES } from '@/lib/constants';
import type { Opportunity } from '@/types';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const urgencyColors = {
  green: 'text-green-500',
  amber: 'text-amber-500',
  red: 'text-red-500',
  grey: 'text-muted-foreground',
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const typeConfig = OPPORTUNITY_TYPES.find((t) => t.value === opportunity.type);

  return (
    <Card className="group transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-semibold leading-tight">{opportunity.title}</h3>
            <p className="text-sm text-muted-foreground">{opportunity.company.name}</p>
          </div>
          {typeConfig && (
            <Badge
              variant="secondary"
              style={{ backgroundColor: typeConfig.color + '20', color: typeConfig.color }}
            >
              {typeConfig.label}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {opportunity.location}
          </span>
          {opportunity.deadline && (
            <span className={cn('flex items-center gap-1', urgencyColors[getDeadlineUrgency(opportunity.deadline)])}>
              <Calendar className="h-3 w-3" />
              {formatDeadline(opportunity.deadline)}
            </span>
          )}
        </div>
        {opportunity.salary && (
          <p className="text-xs font-medium text-muted-foreground">{opportunity.salary}</p>
        )}
        <a
          href={opportunity.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Apply <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
}
